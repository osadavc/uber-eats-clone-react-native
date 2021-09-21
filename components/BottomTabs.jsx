import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export default function BottomTabs() {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 8,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        backgroundColor: "#eee",
      }}
    >
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Browse" route="Home" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Account" />
    </View>
  );
}

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
          size={20}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
          color="#2E3C43"
        />
        <Text style={{ color: "#2E3C43" }}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};
