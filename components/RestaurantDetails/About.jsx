import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/core";

const styles = StyleSheet.create({
  restaurantImage: {
    width: "100%",
    height: 180,
  },
  restaurantName: {
    fontSize: 29,
    fontWeight: "600",
    marginTop: 10,
    marginHorizontal: 15,
  },
  RestaurantDescription: {
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: "400",
    fontSize: 15.5,
  },
});

const About = () => {
  const route = useRoute();

  const { name, image_url, price, rating, review_count, categories } =
    route.params;
  const formattedCategories = categories.map((cat) => cat.title).join(" • ");
  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎟 • ${rating} ⭐ (${review_count}+)`;

  return (
    <View>
      <RestaurantImage image={image_url} />
      <RestaurantName title={name} />
      <RestaurantDescription description={description} />
    </View>
  );
};

const RestaurantImage = ({ image }) => (
  <Image source={{ uri: image }} style={styles.restaurantImage} />
);

const RestaurantName = ({ title }) => (
  <Text style={styles.restaurantName}>{title}</Text>
);

const RestaurantDescription = ({ description }) => (
  <Text style={styles.RestaurantDescription}>{description}</Text>
);

export default About;
