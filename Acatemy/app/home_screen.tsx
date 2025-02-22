import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Link } from "expo-router";
import React from "react";

const { width, height } = Dimensions.get('window');

export default function Home() {
  console.log("Home Screen Loaded");
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
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
          <Image style={styles.acatemyLogo} source={require("../assets/images/Acatemy Title Image Home.png")}/>
          <Image style={styles.petImage} source={require("../assets/images/Pet Image.png")}/>
          <Text style={styles.text}>This is the Home page!</Text>
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
    marginTop: '8%',  
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



