import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function Index() {
  return (
    <ImageBackground source={require("../assets/images/Background.png")} style={styles.image}
      resizeMode="cover"> 
      <View style={styles.container}>
        <Text>This is the index page</Text>
        <Link href="/Homepage" style={styles.button}>
          Go to Homepage
        </Link>
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#000",
  },
});
