import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, Dimensions, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import the navigation hook

export default function Pet_Maker() {
  console.log("Pet Maker Screen Loaded");

  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  // State to store screen dimensions for reactivity
  const [screenWidth, setScreenWidth] = useState(width);
  const [screenHeight, setScreenHeight] = useState(height);

  // Use the navigation hook to navigate
  const navigation = useNavigation();

  // Update dimensions when the window is resized
  useEffect(() => {
    const onResize = () => {
      const { width, height } = Dimensions.get('window');
      setScreenWidth(width);
      setScreenHeight(height);
    };
    
    // Add event listener for screen resizing
    const subscription = Dimensions.addEventListener('change', onResize);

    // Clean up the listener on component unmount
    return () => {
      subscription?.remove();
    };
  }, []);

  const handleCancel = () => {
    console.log('Cancel Button Pressed');
    // Add your cancel logic here
  };

  const handleSave = () => {
    console.log('Save Button Pressed');
    // Add your save logic here
  };

  // Function to handle back button press
  const handleBack = () => {
    console.log('Back Button Pressed');
    navigation.goBack();  // This will navigate to the previous screen
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ImageBackground as the background */}
      <ImageBackground
        source={require('../assets/images/Background.png')}  // Background image source
        style={styles.backgroundImage}  // Apply styling to make the image scale with the screen
        resizeMode="cover"  // Ensures the image covers the whole screen
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={require('../assets/images/Back Button.png')} style={styles.backImage} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>ℙ𝕖𝕥 𝕄𝕒𝕜𝕖𝕣</Text>

        {/* "Choose Your Pet" Text */}
        <View style={styles.textContainer}>
          <Text style={styles.choosePetText}>1. Choose Your Pet</Text>
        </View>

        {/* Image Section (Center the images horizontally) */}
        <View style={styles.imageRow}>
          {/* Cat Image */}
          <Image
            style={[styles.petImage, { height: 150, width: 150 }]}  // Increase size of cat image
            source={require("../assets/images/First-cat-drawing.png")} // Cat image reference
          />

          {/* Dog Image */}
          <Image
            style={[styles.petImage, { height: 150, width: 130 }]}  // Same size as cat image
            source={require("../assets/images/dog.png")}  // Dog image reference
          />

          {/* Plant Image */}
          <Image
            style={[styles.petImage, { height: 150, width: 130 }]}  // Same size as dog image
            source={require("../assets/images/plant.png")}  // Plant image reference
          />
        </View>

        {/* "Name Your Pet" Text */}
        <View style={styles.textContainerName}>
          <Text style={styles.choosePetText}>2. Name Your Pet</Text>
        </View>

        {/* Input for Naming Pet */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter a name"
            placeholderTextColor="grey"
            maxLength={20}
          />
        </View>

        {/* Buttons Section - Now side by side */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,  // This will make the background image fill the entire screen
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
  },
  title: {
    width: '100%',
    height: 80,
    textAlign: 'center',
    color: 'white',
    fontSize: 48,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 56,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    position: 'absolute',
    top: 50,
  },
  textContainer: {
    position: 'absolute',
    top: 180,  // Adjust this value to set space below the title
    width: '100%',
    alignItems: 'center',
  },
  textContainerName: {
    position: 'absolute',
    top: 450,  // Adjust this value to set space below the images
    width: '100%',
    alignItems: 'center',
  },
  choosePetText: {
    width: 240,
    height: 45,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  imageRow: {
    flexDirection: 'row',      // Align images horizontally
    justifyContent: 'center',  // Center images horizontally
    position: 'absolute',
    top: '30%',                // Move the images up by adjusting this value
    width: '100%',
  },
  petImage: {
    resizeMode: 'contain',     // Ensure the image fits within the container
    marginHorizontal: 80,      // Add some space between images horizontally
    marginVertical: 10,        // Add space between images vertically (if you need more vertical space)
  },
  inputContainer: {
    position: 'absolute',
    top: '65%',                // Adjust position based on where you'd like the input
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    height: 55,
    width: 600,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',  // Semi-transparent white background
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 120,  // Position buttons near the bottom
    width: '100%',
    flexDirection: 'row',  // Align buttons side by side
    justifyContent: 'center',  // Center the buttons horizontally
    gap: 150,  // Add space between buttons
  },
  cancelButton: {
    backgroundColor: 'red',  // Red background for Cancel button
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  saveButton: {
    backgroundColor: 'green',  // Green background for Save button
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,   // Distance from the top of the screen
    left: 20,  // Distance from the left of the screen
    zIndex: 1, // Ensure it's on top of other content
  },
  backImage: {
    width: 80,  // Width of the back button image
    height: 80, // Height of the back button image
    resizeMode: 'contain', // Ensures the image scales correctly
  },
});