import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { Link } from "expo-router";
import React from "react";

const { width, height } = Dimensions.get('window');

export default function Index() {
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <View style={styles.horizontalContainer}>
          <Image style={styles.acatemyLogo} source={require("../assets/images/Acatemy Title Image.png")}/>
          <Link href="/login_screen" style={styles.loginButton}>
            Login
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#000",
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
  loginButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#B58392',
    paddingVertical: '3%',  
    paddingHorizontal: '8%',  
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
