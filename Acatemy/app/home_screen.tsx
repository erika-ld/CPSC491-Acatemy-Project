import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function Home() {
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <Text>This is the home page!</Text>
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

/*
import React from 'react';
import { View } from 'react-native';

type MyComponentProps = {
  // Add any props here if needed
};

const MyComponent: React.FC<MyComponentProps> = () => {
  return (
    <View className="box-border flex p-0 mx-auto my-0 min-h-[577px] w-[361px] max-md:w-full max-md:max-w-[361px] max-sm:w-full max-sm:min-h-screen">
      {// Add child components here if needed }
    </View>
  );
};

export default MyComponent;
*/

