import React, { useState } from 'react';
import {
 Text, View, StyleSheet, SafeAreaView, Image, ImageBackground,
 TextInput, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePet } from '../components/petContext';


export default function Pet_Maker() {
 const navigation = useNavigation();
 const { setSelectedPet, setPetName } = usePet();


 const [localSelectedPet, setLocalSelectedPet] = useState<string | null>(null);
 const [localPetName, setLocalPetName] = useState<string>('');


 const handlePetSelection = (petType: string) => {
   setLocalSelectedPet(petType);
 };


 const handleSave = () => {
   if (localSelectedPet) {
     setSelectedPet(localSelectedPet);
     setPetName(localPetName);
     navigation.navigate('pet_customization_screen' as never);
   }
 };


 return (
   <SafeAreaView style={styles.container}>
     <ImageBackground source={require('../assets/images/Background.png')} style={styles.backgroundImage} resizeMode="cover">


       <View style={styles.centerContainer}>
         {/* Title */}
         <Text style={styles.title}>✧ 𝑷𝒆𝒕 𝑴𝒂𝒌𝒆𝒓 ✧</Text>


         {/* "Choose Your Pet" */}
         <Text style={styles.choosePetText}>1. Choose Your Pet</Text>


         {/* Pet Images */}
         <View style={styles.imageRow}>
           <TouchableOpacity onPress={() => handlePetSelection('cat')}>
             <Image
               style={[styles.petImage, localSelectedPet === 'cat' && styles.selectedPetImage]}
               source={require("../assets/images/cat.png")}
             />
           </TouchableOpacity>
           <TouchableOpacity onPress={() => handlePetSelection('dog')}>
             <Image
               style={[styles.petImage, localSelectedPet === 'dog' && styles.selectedPetImage]}
               source={require("../assets/images/dog.png")}
             />
           </TouchableOpacity>
           <TouchableOpacity onPress={() => handlePetSelection('plant')}>
             <Image
               style={[styles.petImage, localSelectedPet === 'plant' && styles.selectedPetImage]}
               source={require("../assets/images/plant.png")}
             />
           </TouchableOpacity>
         </View>


         {/* "Name Your Pet" */}
         <Text style={styles.namePetText}>2. Name Your Pet</Text>


         {/* Input */}
         <TextInput
           style={styles.textInput}
           placeholder="Enter a name"
           placeholderTextColor="grey"
           maxLength={20}
           value={localPetName}
           onChangeText={setLocalPetName}
         />


         {/* Buttons */}
         <View style={styles.buttonsContainer}>
           <TouchableOpacity style={styles.cancelButton}>
             <Text style={styles.buttonText}>Cancel</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
             <Text style={styles.buttonText}>Save</Text>
           </TouchableOpacity>
         </View>
       </View>


     </ImageBackground>
   </SafeAreaView>
 );
}




const styles = StyleSheet.create({
 container: {
   flex: 1
 },


 backgroundImage: {
   flex: 1,
   width: '100%',
   height: '100%',
   alignItems: 'center'
 },


 centerContainer: {
   flex: 1,
   width: '100%',
   justifyContent: 'center',
   alignItems: 'center',
   paddingHorizontal: 20,
   paddingBottom: 60, 
 },


 title: {
   top: '-5%',
   fontSize: 32,
   fontWeight: '400',
   color: 'white',
   textAlign: 'center',
   marginBottom: 50,
 },


 choosePetText: {
   fontSize: 24,
   color: 'white',
   textAlign: 'center',
   marginBottom: 60,
 },


 imageRow: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 60,
 },


 petImage: {
   width: 100,
   height: 100,
   resizeMode: 'contain',
   marginHorizontal: 20, 
 },


 selectedPetImage: {
   borderWidth: 4,
   borderColor: 'white', 
   borderRadius: 10, 
 },


 namePetText: {
   fontSize: 24,
   color: 'white',
   textAlign: 'center',
   marginBottom: 60, 
 },


 textInput: {
   width: 350,
   height: 50,
   borderWidth: 2,
   borderColor: 'grey',
   backgroundColor: 'rgba(255, 255, 255, 0.7)',
   color: 'black',
   fontSize: 18,
   textAlign: 'center',
   borderRadius: 10,
   marginBottom: 60, 
 },


 buttonsContainer: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 20,
 },


 cancelButton: {
   backgroundColor: 'red',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 20,
   marginHorizontal: 30,
 },


 saveButton: {
   backgroundColor: 'green',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 20,
   marginHorizontal: 30,
 },


 buttonText: {
   color: 'white',
   fontSize: 18,
   fontWeight: 'bold',
 },
});