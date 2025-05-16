import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { TimerContext } from "../components/timerContext";

export default function Home() {
  console.log("Home Screen Loaded");

  const { timer } = useContext(TimerContext);

  const formatTime = (time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Link href="/to_do_list_screen" style={styles.link}>
                <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
                  To-Do List
                </Text>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Link href="/pet_maker_screen" style={styles.link}>
                <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
                  New Pet
                </Text>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Link href="/rewards_screen" style={styles.link}>
                <Text style={styles.buttonText} adjustsFontSizeToFit numberOfLines={1}>
                  Rewards
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalContainer}>
            <Image style={styles.acatemyLogo} source={require("../assets/images/Acatemy Title Image Home.png")} resizeMode="contain" />
            <TouchableOpacity onPress={() => console.log('Navigate to pet_customization_screen')}>
              <Link href="/pet_customization_screen" style={styles.link}>
                <Image style={styles.petImage} source={require("../assets/images/cat.png")} resizeMode="contain" />
              </Link>
            </TouchableOpacity>
            <Text style={styles.focusText}>✨Focus✨</Text>
            <TouchableOpacity style={styles.timerContainer}>
              <Link href="/timer_screen" style={styles.link}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // <-- changed from "center"
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start", // <-- changed from "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#B58392',
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    width: "100%",
    marginTop: 16,
    marginBottom: 16, // add some bottom margin if needed
  },
  acatemyLogo: {
    width: "80%",
    height: undefined,
    aspectRatio: 3.5,
    marginVertical: 10,
  },
  petImage: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  focusText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 2,
  },
  timerContainer: {
    marginTop: 2,
    backgroundColor: '#B58392',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
    color: '#fff',
  },
});