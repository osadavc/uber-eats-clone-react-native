import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/RestaurantDetails/About";
import MenuItems from "../components/RestaurantDetails/MenuItems";
import ViewCart from "../components/RestaurantDetails/ViewCart";

const foods = [
  {
    title: "Tandoori Chicken",
    description: "Amazing Indian Dish",
    price: "$19.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Braised Leeks with Mozzarella & a Fried Egg",
    description: "Charleen Badman's terrific leek gratin",
    price: "$26.80",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2010%2F12%2F201012-ss-dishes-leeks.jpg",
  },
  {
    title: "Smoked Pork Jowl with Pickles:",
    description: "Smoked pork jowl: It's like bacon to the bacon power,",
    price: "$16.90",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2010%2F12%2F201012-ss-dishes-smoked-pork.jpg",
  },
  {
    title: "Scallop Sashimi with Meyer Lemon ",
    description: "a sliver of scallop sashimi with lightly sweet Meyer lemon ",
    price: "$30.86",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2010%2F12%2F201012-ss-dishes-scallop-sashimi.jpg",
  },
  {
    title: "Vegan Charcuterie",
    description: "vegan version of the Italian tuna-based sauce tonnato",
    price: "$18.36",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2010%2F12%2F201012-ss-dishes-charcuterie.jpg",
  },
];

const styles = StyleSheet.create({
  RestaurantContainer: {
    backgroundColor: "white",
  },
  divider: {
    marginVertical: 20,
  },
});

const RestaurantDetail = () => {
  return (
    <View style={styles.RestaurantContainer}>
      <ScrollView>
        <About />
        <Divider width={1.6} style={styles.divider} color="#eee" />
        <MenuItems foods={foods} />
      </ScrollView>
      <ViewCart />
    </View>
  );
};

export default RestaurantDetail;
