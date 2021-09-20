import React from "react";
import { View, Text, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ setCity }) {
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#eee",
        borderRadius: 20,
      }}
    >
      <View style={{ marginLeft: 10 }}>
        <Ionicons name="location-sharp" size={24} />
      </View>
      <TextInput
        placeholder="Search"
        style={{
          flexDirection: "row",
          fontWeight: "700",
          paddingVertical: 13,
          paddingHorizontal: 15,
          flex: 1,
        }}
        onChangeText={(text) => {
          setCity(text);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginRight: 8,
          backgroundColor: "white",
          padding: 9,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <AntDesign name="clockcircle" size={11} />
        <Text style={{ marginLeft: 10 }}>Search</Text>
      </View>
    </View>
  );
}
