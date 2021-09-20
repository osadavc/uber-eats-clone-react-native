import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
    title: "Scallop Sashimi with Meyer Lemon Confit",
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
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 17,
    marginVertical: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default function MenuItems() {
  return (
    <View showsVerticalScrollIndicator={false} style={{ paddingBottom: 130 }}>
      {foods.map((item, index) => (
        <View key={index}>
          <View style={styles.menuItem}>
            <BouncyCheckbox
              iconStyle={{
                borderColor: "lightgray",
                borderRadius: 0,
              }}
              fillColor="green"
            />
            <FoodInfo food={item} />
            <FoodImage food={item} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 30 }}
          />
        </View>
      ))}
    </View>
  );
}

const FoodInfo = ({ food }) => (
  <View
    style={{
      width: 240,
      justifyContent: "space-evenly",
    }}
  >
    <Text style={styles.title}>{food.title}</Text>
    <Text>{food.description}</Text>
    <Text>{food.price}</Text>
  </View>
);

const FoodImage = ({ food }) => (
  <Image
    source={{ uri: food.image }}
    style={{ width: 80, height: 80, borderRadius: 8 }}
  />
);
