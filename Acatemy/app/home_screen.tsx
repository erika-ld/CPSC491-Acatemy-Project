import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { TimerContext } from "./timerContext";
//import { useNavigation } from '@react-navigation/native';

//const navigation = useNavigation();

const { width, height } = Dimensions.get('window');

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
      <View style={styles.container}>
        <ScrollView>
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
            <Image style={styles.acatemyLogo} source={require("../assets/images/Acatemy Title Image Home.png")}/>
            <TouchableOpacity onPress={() => console.log('Navigate to pet_customization_screen')}>
              <Link href="/pet_customization_screen" style={styles.link}>
                <Image style={styles.petImage} source={require("../assets/images/Cat Transparent Background.png")}/>
              </Link>
            </TouchableOpacity>
            {/*Took this out <Image style={styles.petImage} source={require("../assets/images/Cat Transparent Background.png")}/> */}
            <Text style={styles.focusText}>✨Focus✨</Text>
            <TouchableOpacity style={styles.timerContainer}>
              <Link href="/timer_screen" style={styles.link}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '6%',  
    marginTop: '5%',  
  },
  button: {
    flex: 1,
    backgroundColor: '#B58392',
    paddingVertical: '2%',  
    paddingHorizontal: '3%',  
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: '2%',  
    display: 'flex'
  },
  link: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: "column",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '10%',  
  },
  acatemyLogo: {
    flex: 1,
    width: width * 0.25,   
    height: height * 0.28,   
  },
  petImage: {
    flex: 1,
    width: width * 0.15,   
    height: height * 0.20, 
    marginTop: '2%',  
  },
  focusText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '7%',
  },
  timerContainer: {
    marginTop: '2%',  
    backgroundColor: '#B58392',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#B58392',
    paddingVertical: '2%',  
    paddingHorizontal: '5%',  
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: '10%',  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: '10%',  
    color: '#fff',
  },
});