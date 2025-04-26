import { ImageBackground, View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function Index() {
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.acatemyLogo}
            source={require("../assets/images/Acatemy Title Image.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Link href="/login_screen" style={styles.loginButton}>
            Login
          </Link>
        </View>
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
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    width: "90%",
    height: "32%", // Make the logo container taller
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  acatemyLogo: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "#B58392",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 10,
    textAlign: "center",
    overflow: "hidden",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    marginTop: 20,
    color: "#fff",
  },
});