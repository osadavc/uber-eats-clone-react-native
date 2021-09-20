import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import RootNavigation from "./Navigation";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";

export default function App() {
  return (
    <View style={{ backgroundColor: "#eee", flex: 1 }}>
      <RootNavigation />
    </View>
  );
}
