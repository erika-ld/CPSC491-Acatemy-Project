import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import React from "react";


export default function Home() {
  console.log("Home Screen Loaded");
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <Text>This is the Home page!</Text>
        <Link href = "/login_screen" style = {styles.button}>
          Login
        </Link>
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
});



/*
import React from "react";
import "./style.css";

export const Box = () => {
  return (
    <div className="box">
      <img
        className="background"
        alt="Background"
        src="https://c.animaapp.com/WYprTfst/img/background.png"
      />
    </div>
  );
};
*/


