import React, { useState, useContext } from 'react';
import { ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { TimerContext } from './timerContext';

const { width, height } = Dimensions.get('window');

export default function TimerScreen() {
  console.log("Focus Timer Screen Loaded");

  const { timer, startTimer, pauseTimer, resumeTimer, resetTimer, isRunning, isPaused } = useContext(TimerContext);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

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

    if (isNaN(hoursInt) || hoursInt < 0 || hoursInt >= 24) {
      Alert.alert("Invalid Input", "Please enter a valid number of hours (0-23).");
      return false;
    }

    if (isNaN(minutesInt) || minutesInt < 0 || minutesInt >= 60) {
      Alert.alert("Invalid Input", "Please enter a valid number of minutes (0-59)");
      return false;
    }

    return true;
  };

  const handleStartTimer = () => {
    if (validateTime()) {
      const totalSeconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
      startTimer(totalSeconds);
      console.log(`Starting timer for ${hours} hours and ${minutes} minutes`);
    }
  };

  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <Text style={styles.title}>Focus Timer</Text>
        <Image style={styles.petImage} source={require("../assets/images/Cat Transparent Background.png")}/>
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
        <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
          <Text style={styles.startText}>Start Timer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40, // Adjust this value to move the content down
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20, // Adjust this value to move the title up
  },
  petImage: {
    width: width * 0.15,   
    height: height * 0.20, 
    marginTop: '8%',  
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    width: 100,
    color: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#B58392',
    textAlign: 'center',
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
  },
  lowerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20, // Add marginTop to align with input boxes
  },
  pauseButton: {
    backgroundColor: '#ebda7c',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  resumeButton: {
    backgroundColor: '#98d99a',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#eba2b7',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  startButton: {
    backgroundColor: '#B58392',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20, // Add marginTop to align with input boxes
  },
  buttonText: {
    color: '#6B385C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});