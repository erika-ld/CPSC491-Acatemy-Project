import { ImageBackground, Text, View, StyleSheet, FlatList, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useCoins } from '../components/coinsContext'; // Import the CoinsContext

export default function Rewards() {
  const { coins, addCoins } = useCoins(); // Access the global coin count and addCoins function
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const rewardsList = [
    { id: "1", name: "Treat🦴", price: 100 },
    { id: "2", name: "Cute Bow🎀", price: 150 },
    { id: "3", name: "Teddy Bear Friend🧸", price: 200 },
    { id: "4", name: "Fancy Hat👒", price: 250 },
  ];

  const purchaseItem = (item: { id: string; name: string; price: number }) => {
    if (coins >= item.price) {
      addCoins(-item.price); // Deduct the item's price from the global coin count
      setPurchasedItems([...purchasedItems, item.name]);
    } else {
      alert("Not enough coins!");
    }
  };

  const collectCoins = () => {
    addCoins(50); // Add 50 coins to the global coin count
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>⋆౨Rewardsৎ˚</Text>
        <Text style={styles.coins}>Coins Collected: {coins} 🪙</Text>

        <TouchableOpacity style={styles.collectButton} onPress={collectCoins}>
          <Text style={styles.collectButtonText}>Collect Coins +50</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>View Rewards</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Items Collected:</Text>
        {purchasedItems.length > 0 ? (
          <FlatList
            data={purchasedItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          />
        ) : (
          <Text style={styles.noItems}>There are no items in the inventory for your pet • ᴖ • </Text>
        )}

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
                      style={[styles.rewardItem, { backgroundColor: isAffordable ? "#FF69B4" : "#D3D3D3" }]}
                      onPress={() => {
                        if (isAffordable) {
                          purchaseItem(item);
                          setModalVisible(false);
                        }
                      }}
                      disabled={!isAffordable}
                    >
                      <Text style={[styles.rewardText, { color: isAffordable ? "#FFF" : "#777" }]}>
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
    fontFamily: "Arial",
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
    fontFamily: "Times New Roman",
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Comic Sans MS",
    letterSpacing: 1.5,
    fontStyle: "italic",
  },
  item: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 8,
    fontFamily: "Courier New",
    letterSpacing: 1.2,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  noItems: {
    fontSize: 18,
    color: "#000000",
    fontFamily: "Verdana",
    letterSpacing: 1.2,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#ffa1bf",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    fontFamily: "Arial",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#810541",
    textAlign: "center",
    fontFamily: "Arial",
    letterSpacing: 2,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  collectButton: {
    backgroundColor: "#68ff80",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  collectButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#810541",
    fontFamily: "Arial",
    letterSpacing: 1,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Times New Roman",
    letterSpacing: 1.5,
  },
  rewardItem: {
    padding: 15,
    marginVertical: 7,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#ff69b4",
    textTransform: "capitalize",
  },
  rewardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Comic Sans MS",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ff4081",
    padding: 12,
    borderRadius: 12,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Verdana",
  },
});