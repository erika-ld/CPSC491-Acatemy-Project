import { ImageBackground, Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../firebase"; // Import Firebase auth instance
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth"; // Add this import


export default function Login() {
  console.log("Login Screen Loaded");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Login User
  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      window.location.href = '/home_screen'; // Adjust path as needed

    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover"> 
      <View style={styles.container}>
        <ScrollView>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!user && (
            <>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={{bottom: 82, left: 320}} >
                <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="white" onPress={toggleShowPassword}/>
              </TouchableOpacity>
              <Link href="/register" style={styles.link}>
                <Text>Don't have an account?</Text>
              </Link>
              <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}

          {user && (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          )}

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
  logoutButton: {
    backgroundColor: '#FF0000',
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