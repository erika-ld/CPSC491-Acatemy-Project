import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Pet_Customization_Screen() {
  console.log("Pet Customizer Screen Loaded");

  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  // State to store screen dimensions for reactivity
  const [screenWidth, setScreenWidth] = useState(width);
  const [screenHeight, setScreenHeight] = useState(height);

  // State to control visibility of the dropdowns
  const [isAccessoriesDropdownVisible, setIsAccessoriesDropdownVisible] = useState(false);
  const [isCurrentPetDropdownVisible, setIsCurrentPetDropdownVisible] = useState(false);

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
    const listener = Dimensions.addEventListener('change', onResize);

    // Cleanup the listener on component unmount
    return () => {
      listener?.remove();
    };
  }, []);

  const handleCancel = () => {
    console.log('Cancel Button Pressed');
  };

  const handleSave = () => {
    console.log('Save Button Pressed');
  };

  const handleBack = () => {
    console.log('Back Button Pressed');
    navigation.goBack();  // This will navigate to the previous screen
  };

  const handleAccessoriesPress = () => {
    setIsAccessoriesDropdownVisible(!isAccessoriesDropdownVisible);
    if (isCurrentPetDropdownVisible) {
      setIsCurrentPetDropdownVisible(false);
    }
  };

  const handleCurrentPetPress = () => {
    setIsCurrentPetDropdownVisible(!isCurrentPetDropdownVisible);
    if (isAccessoriesDropdownVisible) {
      setIsAccessoriesDropdownVisible(false);
    }
  };

  // Calculate dropdown left position based on screen width
  const accessoriesDropdownLeft = screenWidth * 0.12; // 12% of screen width
  const currentPetDropdownLeft = screenWidth * 0.50; // 50% of screen width (adjust based on needs)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/Background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={require('../assets/images/Back Button.png')} style={styles.backImage} />
        </TouchableOpacity>

        <Text style={styles.title}>ℙ𝕖𝕥 ℂ𝕦𝕤𝕥𝕠𝕞𝕚𝕫𝕖𝕣</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sideBySideButtonsContainer}>
          <TouchableOpacity style={styles.accessoriesButton} onPress={handleAccessoriesPress}>
            <Text style={styles.buttonText}>Accessories</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.currentPetButton} onPress={handleCurrentPetPress}>
            <Text style={styles.buttonText}>Current Pet View</Text>
          </TouchableOpacity>
        </View>

        {/* Dropdowns side-by-side */}
        <View style={[styles.dropdownContainer, { top: screenHeight * 0.264 }]}>
          {isAccessoriesDropdownVisible && (
            <View style={[styles.dropdown, { left: accessoriesDropdownLeft }]}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Option 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Option 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Option 3</Text>
              </TouchableOpacity>
            </View>
          )}

          {isCurrentPetDropdownVisible && (
            <View style={[styles.dropdown, { left: currentPetDropdownLeft }]}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Option 4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Option 5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>Option 6</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Cat Transparent Image in the middle */}
        <Image
          source={require('../assets/images/Cat Transparent Background.png')}
          style={styles.catImage}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  buttonsContainer: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 150,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  saveButton: {
    backgroundColor: 'green',
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
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  sideBySideButtonsContainer: {
    position: 'absolute',
    bottom: 620,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 150,
  },
  accessoriesButton: {
    width: 200,
    paddingVertical: 10,
    backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  currentPetButton: {
    width: 200,
    paddingVertical: 10,
    backgroundColor: 'lightblue',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  dropdownContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, // Ensures dropdowns are spaced apart
  },
  dropdown: {
    backgroundColor: 'rgba(207, 150, 187, 0.9)',
    borderRadius: 0,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  catImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -175 }, 
      { translateY: -145 }, 
    ],
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
});