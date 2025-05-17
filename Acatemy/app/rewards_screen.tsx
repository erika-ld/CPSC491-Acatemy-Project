import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCoins } from '../components/coinsContext';


export default function Rewards() {
  const { coins, addCoins, updateCoins } = useCoins(); // 👈 use context
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [treatImage, setTreatImage] = useState(null);

  const [happiness, setHappiness] = useState(60);

  // Pets list
  const petsList = [
    { id: "1", name: "Dog", image: require("../assets/images/dog.png") },
    { id: "2", name: "Cat", image: require("../assets/images/cat.png") },
    { id: "3", name: "Plant", image: require("../assets/images/plant.png") },
  ];

  // Rewards list
  const rewardsList = [
    { id: "1", name: "Treat", price: 100, image: require("../assets/images/CUPCAKE.png") },
    { id: "2", name: "Cute Bow", price: 150, image: require("../assets/images/BOW.png") },
    { id: "3", name: "Teddy Bear Friend", price: 200, image: require("../assets/images/TEDDY.png") },
    { id: "4", name: "Fancy Hat", price: 250, image: require("../assets/images/HAT.png") },
  ];

  // Images of pet + item
  const preMadeImages = {
    "1-1": require("../assets/images/dog-bone.png"), // Dog + Bone
    "1-2": require("../assets/images/dog-bow.png"), // Dog + Bow
    "1-3": require("../assets/images/dog-bear.png"), // Dog + Bear
    "1-4": require("../assets/images/dog-hat.png"), // Dog + Hat
    "2-1": require("../assets/images/cat-fish.png"), // Cat + Fish
    "2-2": require("../assets/images/cat-bow.png"), // Cat + Bow
    "2-3": require("../assets/images/cat-bear.png"), // Cat + Bear
    "2-4": require("../assets/images/cat-hat.png"), // Cat + Hat
    "3-1": require("../assets/images/plant-pot.png"), // Plant + Treat
    "3-2": require("../assets/images/plant-bow.png"), // Plant + Bow
    "3-3": require("../assets/images/plant-bear.png"), // Plant + Bear
    "3-4": require("../assets/images/plant-hat.png"), // Plant + Hat
  };

  // Decrease happiness by 20 every hour
  useEffect(() => {
    if (!selectedPet) return;

    const interval = setInterval(() => {
      setHappiness(prev => Math.max(prev - 20, 0));
    }, 3600000); // 1 hour in ms

    return () => clearInterval(interval);
  }, [selectedPet]);

  const selectPet = (pet) => {
    setSelectedPet(pet); // Set the selected pet
  };

  const purchaseItem = (item) => {
    if (coins >= item.price && selectedPet) {
      setCoins(coins - item.price);

      const imageKey = `${selectedPet.id}-${item.id}`;

      if (item.name === "Treat") {
        const treatImageKey = `${selectedPet.id}-1`;
        setTreatImage(preMadeImages[treatImageKey]);
      
        // Increase happiness by 20, max 100
        setHappiness((prev) => Math.min(prev + 20, 100));
      
        // Clear treat image after 3 seconds
        setTimeout(() => {
          setTreatImage(null);
        }, 3000);
      } else {
        const newItem = {
          petId: selectedPet.id,
          petName: selectedPet.name,
          itemId: item.id,
          itemName: item.name,
          image: preMadeImages[imageKey],
        };
        setPurchasedItems(prevItems => [...prevItems, newItem]);
      }
    } else {
      alert("Not enough coins or no pet has been selected!");
    }
  };

  const collectCoins = () => {
    setCoins(coins + 50);
  };

  const clearInventory = () => {
    setPurchasedItems([]);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("../assets/images/Background.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>⋆౨Rewards˚</Text>
        <Text style={styles.coins}>Coins Collected: {coins} 🪙</Text>


        {/* Pet Selection Section */}
        <Text style={styles.subtitle}>Choose a Pet:</Text>
        <FlatList
          data={selectedPet ? [selectedPet] : petsList}
          keyExtractor={(pet) => pet.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => selectPet(item)}
              style={styles.petItem}
            >
              <Image source={item.image} style={styles.petImage} />
              <Text style={styles.petName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Show Happiness if pet is selected */}
        {selectedPet && (
          <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
            Happiness: {happiness}%
          </Text>
        )}

        {/* Show 'Change Pet' button if a pet is selected */}
        {selectedPet && (
          <TouchableOpacity
            onPress={() => setSelectedPet(null)}
            style={styles.changePetButton}
          >
            <Text style={styles.changePetButtonText}>Change Pet</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>View Rewards</Text>
        </TouchableOpacity>

        {/* Purchased Item Section */}
        <Text style={styles.subtitle}>Items Collected:</Text>

        {purchasedItems.length === 0 ? (
          <Text style={styles.noItemsText}>No items in inventory</Text>
        ) : (
          <FlatList
            data={purchasedItems}
            keyExtractor={(item) => `${item.petId}-${item.itemId}`}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={item.image} style={{ width: 80, height: 80 }} />
                <Text style={styles.itemText}>
                  {item.itemName} for {item.petName}
                </Text>
              </View>
            )}
          />
        )}

        {/* Treat popup */}
        {treatImage && (
          <View style={styles.treatOverlay}>
            <View style={styles.treatPopup}>
              <Image source={treatImage} style={styles.treatImageLarge} />
              <Text style={styles.treatTextPopup}>
                {selectedPet?.name} is enjoying the treat! 🐾🍖
              </Text>
            </View>
          </View>
        )}

        {/* Rewards Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Available Rewards</Text>
              <FlatList
                data={rewardsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isAffordable = coins >= item.price;
                  return (
                    <TouchableOpacity
                      style={[
                        styles.rewardItem,
                        { backgroundColor: isAffordable ? "#FF69B4" : "#D3D3D3" },
                      ]}
                      onPress={() => {
                        if (isAffordable) {
                          purchaseItem(item);
                          setModalVisible(false);
                        }
                      }}
                      disabled={!isAffordable}
                    >
                      <Image source={item.image} style={{ width: 80, height: 80 }} />
                      <Text
                        style={[
                          styles.rewardText,
                          { color: isAffordable ? "#FFF" : "#777" },
                        ]}
                      >
                        {item.name} - {item.price}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Conditionally render Clear Inventory button */}
        {purchasedItems.length > 0 && (
          <TouchableOpacity
            style={styles.clearInventoryButton}
            onPress={clearInventory}
          >
            <Text style={styles.clearInventoryButtonText}>Clear Inventory</Text>
          </TouchableOpacity>
        )}
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  coins: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gold",
    marginBottom: 20,
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  petItem: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  petImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#fff",
  },
  petName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  changePetButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  changePetButtonText: {
    fontSize: 14,
    color: "#FF69B4",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF69B4",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  noItemsText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  treatOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  treatPopup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  treatImageLarge: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  treatTextPopup: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rewardItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  rewardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#FF69B4",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  clearInventoryButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 15,
  },
  clearInventoryButtonText: {
    color: "white",
    fontSize: 16,
  },
});