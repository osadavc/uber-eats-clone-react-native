import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const Items = [
  {
    image: require("../../assets/images/shopping-bag.png"),
    text: "Pick-up",
  },
  {
    image: require("../../assets/images/bread.png"),
    text: "Bakery Items",
  },
  {
    image: require("../../assets/images/fast-food.png"),
    text: "Fast Food",
  },
  {
    image: require("../../assets/images/deals.png"),
    text: "Deals",
  },
  {
    image: require("../../assets/images/coffee.png"),
    text: "Coffee & Tea",
  },
  {
    image: require("../../assets/images/desserts.png"),
    text: "Desserts",
  },
];

const styles = StyleSheet.create({
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingLeft: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 30,
  },
  categoryImage: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "900",
    fontFamily: "Nunito",
  },
});

const Categories = () => {
  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Items.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
