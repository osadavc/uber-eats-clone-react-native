import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: "row",
    padding: 8,
    paddingHorizontal: 35,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  bottomTabIcon: { marginBottom: 2, alignSelf: "center" },
  bottomTabText: { color: "#2E3C43" },
});

const BottomTabs = () => {
  return (
    <View style={styles.bottomTabContainer}>
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Browse" route="Home" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Account" />
    </View>
  );
};

const Icon = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.route) {
          navigation.navigate(props.route);
        }
      }}
    >
      <View>
        <FontAwesome5
          name={props.icon}
          size={21}
          style={styles.bottomTabIcon}
          color="#2E3C43"
        />
        <Text style={styles.bottomTabText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BottomTabs;
