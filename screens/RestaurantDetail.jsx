import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/RestaurantDetails/About";
import MenuItems from "../components/RestaurantDetails/MenuItems";
import ViewCart from "../components/RestaurantDetails/ViewCart";

export default function RestaurantDetail({ route, navigation }) {
  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView>
        <About route={route} />
        <Divider width={1.6} style={{ marginVertical: 20 }} color="#eee" />
        <MenuItems />
      </ScrollView>
      <ViewCart navigation={navigation} restaurantName={route.params.name} />
    </View>
  );
}
