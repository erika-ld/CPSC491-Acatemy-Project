import React, { useState } from 'react';
import {
 Text, View, StyleSheet, SafeAreaView, ImageBackground,
 TouchableOpacity, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePet } from '../components/petContext'; 


export default function Pet_Customization_Screen() {
 const navigation = useNavigation();
 const { selectedPet } = usePet(); 
 const actualPet = selectedPet ?? 'cat';


 // Base pet image depending on selected pet
 const basePetImage = actualPet === 'dog'
   ? require('../assets/images/dog.png')
   : actualPet === 'plant'
   ? require('../assets/images/plant.png')
   : require('../assets/images/cat.png');


 // Accessory options based on pet
 const accessoryOptions = [
   {
     name: 'None',
     image: basePetImage,
     icon: 'None'
   },
   {
     name: 'Hat',
     image: actualPet === 'dog'
       ? require('../assets/images/dog-hat.png')
       : actualPet === 'plant'
       ? require('../assets/images/plant-hat.png')
       : require('../assets/images/cat-hat.png'),
     icon: require('../assets/images/HAT.png')
   },
   {
     name: 'Bow',
     image: actualPet === 'dog'
       ? require('../assets/images/dog-bow.png')
       : actualPet === 'plant'
       ? require('../assets/images/plant-bow.png')
       : require('../assets/images/cat-bow.png'),
     icon: require('../assets/images/BOW.png')
   },
   {
     name: 'Teddy',
     image: actualPet === 'dog'
       ? require('../assets/images/dog-bear.png')
       : actualPet === 'plant'
       ? require('../assets/images/plant-bear.png')
       : require('../assets/images/cat-bear.png'),
     icon: require('../assets/images/TEDDY.png')
   },
   {
     name: 'Cupcake',
     image: actualPet === 'dog'
       ? require('../assets/images/dog-treat.png')
       : actualPet === 'plant'
       ? require('../assets/images/plant-treat.png')
       : require('../assets/images/cat-treat.png'),
     icon: require('../assets/images/CUPCAKE.png')
   },
 ];


 const [currentIndex, setCurrentIndex] = useState(0);


 const next = () => setCurrentIndex((prev) => (prev + 1) % accessoryOptions.length);
 const prev = () => setCurrentIndex((prev) => (prev - 1 + accessoryOptions.length) % accessoryOptions.length);


 return (
   <SafeAreaView style={styles.container}>
     <ImageBackground
       source={require('../assets/images/Background.png')}
       style={styles.backgroundImage}
       resizeMode="cover"
     >
       {/* Title */}
       <Text style={styles.title}>✧ 𝑷𝒆𝒕 𝑪𝒖𝒔𝒕𝒐𝒎𝒊𝒛𝒆𝒓✧</Text>


       {/* Pet with selected accessory */}
       <Image
         source={accessoryOptions[currentIndex].image}
         style={styles.catImage}
       />


       {/* Arrow Controls */}
       <View style={styles.arrowContainer}>
         <TouchableOpacity onPress={prev} style={styles.arrowButton}>
           <Text style={styles.arrowText}>{"<"}</Text>
         </TouchableOpacity>


         {/* Accessory Preview in Middle */}
         {accessoryOptions[currentIndex].name === 'None' ? (
           <Text style={styles.noneText}>None</Text>
         ) : (
           <Image
             source={accessoryOptions[currentIndex].icon}
             style={styles.accessoryPreviewIcon}
           />
         )}


         <TouchableOpacity onPress={next} style={styles.arrowButton}>
           <Text style={styles.arrowText}>{">"}</Text>
         </TouchableOpacity>
       </View>


       {/* Save & Cancel Buttons */}
       <View style={styles.saveCancelButtonRow}>
         <TouchableOpacity style={styles.cancelButton}>
           <Text style={styles.buttonText}>Cancel</Text>
         </TouchableOpacity>


         <TouchableOpacity style={styles.saveButton}>
           <Text style={styles.buttonText}>Save</Text>
         </TouchableOpacity>
       </View>


     </ImageBackground>
   </SafeAreaView>
 );
}


const styles = StyleSheet.create({
 container: { flex: 1 },
 backgroundImage: { flex: 1, width: '100%', height: '100%' },


 title: {
   position: 'absolute',
   top: '12%',
   left: '50%',
   transform: [{ translateX: -140 }],
   fontSize: 36,
   fontWeight: '400',
   color: 'white',
   textAlign: 'center',
   width: 300,
 },


 catImage: {
   position: 'absolute',
   top: '42%',
   left: '50%',
   transform: [{ translateX: -125 }],
   width: 250,
   height: 250,
   resizeMode: 'contain',
 },


 arrowContainer: {
   position: 'absolute',
   top: '26%',
   flexDirection: 'row',
   width: '100%',
   justifyContent: 'center',
   alignItems: 'center',
   paddingHorizontal: 30,
   gap: 40,
   height: 120,
 },


 arrowButton: {
   backgroundColor: 'pink',
   padding: 22,
   borderRadius: 40,
   borderWidth: 3,
   borderColor: 'black',
 },


 arrowText: {
   fontSize: 36,
   color: 'white',
   fontWeight: 'bold',
 },


 accessoryPreviewIcon: {
   width: 120,
   height: 120,
   resizeMode: 'contain',
 },


 noneText: {
   fontSize: 24,
   fontWeight: 'bold',
   color: 'white',
   textAlign: 'center',
   width: 120,
 },


 saveCancelButtonRow: {
   position: 'absolute',
   top: '85%',
   width: '100%',
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
 },


 cancelButton: {
   backgroundColor: 'red',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 20,
   marginHorizontal: 50,
 },


 saveButton: {
   backgroundColor: 'green',
   paddingVertical: 10,
   paddingHorizontal: 28,
   borderRadius: 20,
   marginHorizontal: 50,
 },


 buttonText: {
   color: 'white',
   fontSize: 19,
   fontWeight: 'bold',
   textAlign: 'center',
 },
});