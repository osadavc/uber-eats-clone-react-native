import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: "900",
    fontSize: 15,
    fontFamily: "Nunito",
  },
});

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
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
};

const HeaderButtons = ({
  text,
  btnColor,
  textColor,
  activeTab,
  setActiveTab,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      {
        backgroundColor: activeTab === text ? "black" : "white",
      },
    ]}
    onPress={() => setActiveTab(text)}
  >
    <Text
      style={[
        {
          color: activeTab === text ? "white" : "black",
        },
        styles.buttonText,
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

export default HeaderTabs;
