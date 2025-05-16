import React, { useState, useContext, useEffect, useCallback } from 'react';
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Image, ActivityIndicator } from 'react-native';
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase';
import { TimerContext } from '../components/timerContext';
import { useCoins } from '../components/coinsContext';
import { AppState } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import * as Speech from 'expo-speech';  

export default function TimerScreen() {
  const { timer, startTimer, pauseTimer, resumeTimer, resetTimer, isRunning, isPaused } = useContext(TimerContext);
  const { coins, setCoins } = useCoins();
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [dailyCoins, setDailyCoins] = useState(0);
  const [lastCoinTime, setLastCoinTime] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastMinuteCounted, setLastMinuteCounted] = useState(false);

  // Get authenticated user ID and load data
  useEffect(() => {
    const getCurrentUser = () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null); // null instead of "guest_user"
      }
      setIsLoading(false);
    };

    getCurrentUser();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchAndSyncCoins(); // fetch coins on login
      } else {
        setUserId(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Always fetch latest data from Firestore when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userId && !isLoading) {
        fetchAndSyncCoins();
      }
      return () => {
        // Save coins when navigating away
        saveDailyCoins(dailyCoins);
      };
    }, [userId, isLoading])
  );

  // Fetch and sync coins from Firestore to local and global state
  const fetchAndSyncCoins = async () => {
    if (!userId || userId === "guest_user") return;
    try {
      const userDoc = doc(db, "users", userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDailyCoins(data.dailyCoins || 0);
        setCoins(data.dailyCoins || 0);
      }
    } catch (error) {
      console.error('Failed to load coins data:', error);
      Alert.alert("Error", "Failed to load your coins data. Please check your connection.");
    }
  };

  // Save daily coins to Firestore
  const saveDailyCoins = async (coinsValue: number) => {
    if (!userId || userId === "guest_user") return;
    try {
      const userDoc = doc(db, "users", userId);
      await setDoc(userDoc, {
        dailyCoins: coinsValue,
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Failed to save daily coins:', error);
    }
  };

  // Award coins for every minute passed
  useEffect(() => {
    if (timer > 0 && lastCoinTime > 0) {
      const secondsPassed = lastCoinTime - timer;
      if (secondsPassed >= 60) {
        const minutesPassed = Math.floor(secondsPassed / 60);
        setDailyCoins(prev => {
          const newCoins = prev + minutesPassed;
          setCoins(newCoins);
          saveDailyCoins(newCoins);
          return newCoins;
        });
        setLastCoinTime(timer - (secondsPassed % 60));
      }
    }
    // Reset flags when timer is restarted
    if (timer > 0 && timer === lastCoinTime) {
      setLastMinuteCounted(false);
    }
  }, [timer]);

  // Award coin for the last minute when timer completes
  useEffect(() => {
    if (timer === 0 && !lastMinuteCounted && lastCoinTime > 0) {
      setDailyCoins(prev => {
        const newCoins = prev + 1;
        setCoins(newCoins);
        saveDailyCoins(newCoins);
        return newCoins;
      });
      setLastCoinTime(0);
      setLastMinuteCounted(true)
      Speech.speak("Timer complete! Great job focusing!", {
        voice: "Microsoft Zira - English (United States) (Microsoft Zira - English (United States))",
      });
    }
  }, [timer, lastMinuteCounted, lastCoinTime]);

  // Save coins when app goes to background
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        saveDailyCoins(dailyCoins);
      }
    });
    return () => subscription.remove();
  }, [dailyCoins, userId]);

  const formatTime = (time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHoursChange = (text: string) => {
    let value = parseInt(text, 10);
    if (isNaN(value)) setHours("");
    else setHours(Math.max(0, Math.min(23, value)).toString());
  };

  const handleMinutesChange = (text: string) => {
    let value = parseInt(text, 10);
    if (isNaN(value)) setMinutes("");
    else setMinutes(Math.max(0, Math.min(59, value)).toString());
  };

  const validateTime = () => {
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);
    if ((isNaN(hoursInt) || hoursInt < 0 || hoursInt >= 24) && hours !== "") {
      Alert.alert("Invalid Input", "Please enter a valid number of hours (0-23).");
      return false;
    }
    if (isNaN(minutesInt) || minutesInt < 0 || minutesInt >= 60) {
      Alert.alert("Invalid Input", "Please enter a valid number of minutes (0-59)");
      return false;
    }
    if (hours === "" && minutes === "") {
      Alert.alert("Invalid Input", "Please enter a valid number of hours or minutes.");
      return false;
    }
    return true;
  };

  const handleStartTimer = () => {
    if (validateTime()) {
      const totalSeconds = (parseInt(hours, 10) || 0) * 3600 + (parseInt(minutes, 10) || 0) * 60;
      setLastCoinTime(totalSeconds);
      setLastMinuteCounted(false);
      startTimer(totalSeconds);
    }
  };

  const handleReset = () => {
    setHours("");
    setMinutes("");
    setLastCoinTime(0);
    setLastMinuteCounted(false);
    resetTimer();
  };

  if (isLoading) {
    return (
      <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.title}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
          <View style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Focus Timer</Text>
        <Text style={styles.coinsText}>Coins Collected Today: {dailyCoins} 🪙</Text>
        <View style={styles.petImageContainer}>
          <Image
            style={styles.petImage}
            source={require("../assets/images/cat.png")}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="00"
              placeholderTextColor="#fff"
              value={hours}
              onChangeText={handleHoursChange}
            />
            <Text style={styles.inputLabel}>Hours</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="00"
              placeholderTextColor="#fff"
              value={minutes}
              onChangeText={handleMinutesChange}
            />
            <Text style={styles.inputLabel}>Minutes</Text>
          </View>
        </View>
        <View style={styles.lowerButtonContainer}>
          <TouchableOpacity style={styles.pauseButton} onPress={pauseTimer} disabled={!isRunning || isPaused}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resumeButton} onPress={resumeTimer} disabled={!isPaused}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={resetTimer}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.startResetContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
            <Text style={styles.startText}>Start Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>Reset Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: 2000, // <- Keeps things centered and readable on web
    alignItems: "center"
  },
  safeContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 30,
  paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  coinsText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 5,
    alignSelf: "center",
  },
  petImageContainer: {
    width: "15%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  petImage: {
    width: "100%",
    height: "100%",
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "20%",
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
    flex: 1,
  },
  input: {
    height: 50,
    width: "100%",
    minWidth: 80,
    maxWidth: 120,
    color: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#B58392",
    textAlign: "center",
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  lowerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    width: "30%",
  },
  pauseButton: {
    backgroundColor: "#ebda7c",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
  },
  resumeButton: {
    backgroundColor: "#98d99a",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#eba2b7",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
  },
  startResetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "25%", // take full width
    paddingHorizontal: 20,
    gap: 10, // optional, adds space between buttons
    flexWrap: 'wrap', // allows wrapping if needed
  },
  startButton: {
    backgroundColor: "#B58392",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 10,
    flex: 1,
  },
  resetButton: {
    backgroundColor: "#B58392",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 10,
    flex: 1,
  },
  buttonText: {
    color: "#6B385C",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  startText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});