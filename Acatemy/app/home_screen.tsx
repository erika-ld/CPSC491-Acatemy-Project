import { ImageBackground, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function Home() {
  console.log("Home Screen Loaded");
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Link href="/to_do_list_screen" style={styles.buttonText}>
              <Text style={styles.buttonText}>To-Do List</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href="/pet_maker_screen" style={styles.buttonText}>
              <Text style={styles.buttonText}>New Pet</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Link href="/rewards_screen" style={styles.buttonText}>
              <Text style={styles.buttonText}>Rewards</Text>
            </Link>
          </TouchableOpacity>
        </View>
        <Text>This is the Home page!</Text>
        <Link href="/login_screen" style={styles.button}>
          Login
        </Link>
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
    width: '100%', // Adjust this value to control the spacing
    marginTop: 10,
  },
  button: {
    backgroundColor: '#B58392',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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


