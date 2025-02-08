import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function Homepage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the home page!</Text>
    </View>
  );
}

/*
import React from 'react';
import { View } from 'react-native';

type MyComponentProps = {
  // Add any props here if needed
};

const MyComponent: React.FC<MyComponentProps> = () => {
  return (
    <View className="box-border flex p-0 mx-auto my-0 min-h-[577px] w-[361px] max-md:w-full max-md:max-w-[361px] max-sm:w-full max-sm:min-h-screen">
      {// Add child components here if needed }
    </View>
  );
};

export default MyComponent;
*/

