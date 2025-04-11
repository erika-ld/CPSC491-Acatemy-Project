import { ImageBackground, Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../firebase"; // Import Firebase auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import functions properly

export default function Login() {
  console.log("Register Screen Loaded");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

// Register User
  const handleRegister = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created! You can now log in.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <ScrollView>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput placeholder="Email" style={styles.input} value={email}  onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" style={styles.input} secureTextEntry={!showPassword}/>
        
        <TouchableOpacity style={{bottom: 82, left: 320}} >
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="white" onPress={toggleShowPassword}/>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute'
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#6b385c',
    fontSize: 30,
    marginBottom: 50,
    color: 'white'
  },
  inputLogin: {
    backgroundColor: '#6b385c',
    fontSize: 30,
    marginBottom: 50
  },

  loginButton: {
    backgroundColor: '#B58392',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20,
    fontSize: 30,
    width: 200,
    justifyContent: 'center',
    textAlign:'center',
    alignSelf: 'center',
    flex: 1
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    width: 200,
    alignItems: 'center'
  },
  buttonText: {
    color: "white",
    fontSize: 18
  },
  link: {
    marginTop: 15,
    color: 'white',
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  }
});