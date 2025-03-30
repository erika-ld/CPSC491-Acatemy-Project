import React, { useState, useContext, useEffect } from 'react';
import { ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { TimerContext } from './timerContext';
import { useCoins } from './coinsContext'; // Ensure this is correctly imported

const { width, height } = Dimensions.get('window');

export default function TimerScreen() {
  console.log("Focus Timer Screen Loaded");

  const { timer, startTimer, pauseTimer, resumeTimer, resetTimer, isRunning, isPaused } = useContext(TimerContext);
  const { addCoins } = useCoins(); // Access global coin management
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [dailyCoins, setDailyCoins] = useState(0); // State to track coins collected today
  const [lastCoinTime, setLastCoinTime] = useState(0); // Tracks the last time coins were awarded

// Load coins and last reset time from AsyncStorage
useEffect(() => {
  const loadCoinsData = async () => {
    try {
      const storedDailyCoins = await AsyncStorage.getItem('dailyCoins');
      const storedResetTime = await AsyncStorage.getItem('lastResetTime');
      const currentTime = Date.now();

      if (storedResetTime) {
        const lastResetTime = parseInt(storedResetTime, 10);
        const hoursSinceLastReset = (currentTime - lastResetTime) / (1000 * 60 * 60);

        if (hoursSinceLastReset >= 24) {
          // Reset daily coins if 24 hours have passed
          setDailyCoins(0);
          await AsyncStorage.setItem('dailyCoins', '0');
          await AsyncStorage.setItem('lastResetTime', currentTime.toString());
        } else if (storedDailyCoins) {
          // Load daily coins if within the same day
          setDailyCoins(parseInt(storedDailyCoins, 10));
        }
      } else {
        // Initialize reset time if not set
        await AsyncStorage.setItem('lastResetTime', currentTime.toString());
      }
    } catch (error) {
      console.error('Failed to load coins data:', error);
    }
  };

  loadCoinsData();
}, []);

// Save daily coins to AsyncStorage whenever they change
useEffect(() => {
  const saveDailyCoins = async () => {
    try {
      await AsyncStorage.setItem('dailyCoins', dailyCoins.toString());
    } catch (error) {
      console.error('Failed to save daily coins:', error);
    }
  };

  saveDailyCoins();
}, [dailyCoins]);

  const formatTime = (time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHoursChange = (text: string) => {
    let value = parseInt(text, 10);
    if (isNaN(value)) {
      setHours("");
    } else {
      if (value < 0) {
        value = 0;
      } else if (value >= 24) {
        value = 23;
      }
      setHours(value.toString());
    }
  };

  const handleMinutesChange = (text: string) => {
    let value = parseInt(text, 10);
    if (isNaN(value)) {
      setMinutes("");
    } else {
      if (value < 0) {
        value = 0;
      } else if (value >= 60) {
        value = 59;
      }
      setMinutes(value.toString());
    }
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
      setLastCoinTime(totalSeconds); // Initialize the last coin time to the total seconds
      startTimer(totalSeconds);
      console.log(`Starting timer for ${hours || 0} hours and ${minutes || 0} minutes`);
    }
  };

// Effect to track timer progress and award coins
useEffect(() => {
  if (timer > 0 && lastCoinTime - timer >= 60) {
    // Check if 1 minute has passed since the last coin was awarded
    setDailyCoins((prevDailyCoins) => prevDailyCoins + 1); // Increment daily coins
    addCoins(1); // Increment global coins
    setLastCoinTime(timer); // Update the last coin time
  }

  if (timer === 0 && lastCoinTime > 0) {
    // Handle the last minute when the timer reaches 0
    setDailyCoins((prevDailyCoins) => prevDailyCoins + 1); // Increment daily coins
    addCoins(1); // Increment global coins
    setLastCoinTime(0); // Reset lastCoinTime to prevent duplicate increments
  }
}, [timer]);

const handleReset = () => {
  // Reset all values
  setHours("");
  setMinutes("");
  setLastCoinTime(0);
  resetTimer(); // Stop and reset the timer
  console.log("Timer and values have been reset.");
};

return (
  <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
    <View style={styles.container}>
      <Text style={styles.title}>Focus Timer</Text>
      <Text style={styles.coinsText}>Coins Collected Today: {dailyCoins} 🪙</Text>
      <Image style={styles.petImage} source={require("../assets/images/Cat Transparent Background.png")} />
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
  </ImageBackground>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
  },
  petImage: {
    width: width * 0.15,
    height: height * 0.20,
    marginTop: "8%",
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  coinsText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    width: 100,
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
  },
  pauseButton: {
    backgroundColor: "#ebda7c",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  resumeButton: {
    backgroundColor: "#98d99a",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#eba2b7",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  startButton: {
    backgroundColor: "#B58392",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 10, // Add space between the buttons
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
  startResetContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Add space between the buttons
    alignItems: "center",
    marginTop: 20,
    width: "100%", // Ensure the container spans the full width
    paddingHorizontal: 30, // Add padding for spacing from the edges
  },
  resetButton: {
    backgroundColor: "#B58392",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginHorizontal: 10, // Add space between the buttons
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});