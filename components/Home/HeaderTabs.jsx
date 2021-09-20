import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HeaderTabs({ activeTab, setActiveTab }) {
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButtons
        text="Pickup"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButtons
        text="Delivery"
        btnColor="black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const HeaderButtons = ({
  text,
  btnColor,
  textColor,
  activeTab,
  setActiveTab,
}) => (
  <TouchableOpacity
    style={{
      backgroundColor: activeTab === text ? "black" : "white",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => setActiveTab(text)}
  >
    <Text
      style={{
        color: activeTab === text ? "white" : "black",
        fontWeight: "900",
        fontSize: 15,
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
