import React from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function About({ route }) {
  const { name, image, price, rating, reviews, categories } = route.params;
  const formattedCategories = categories.map((cat) => cat.title).join(" • ");
  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎟 • ${rating} ⭐ (${reviews}+)`;

  return (
    <View>
      <StatusBar style="inverted" translucent={true} />
      <RestaurantImage image={image} />
      <RestaurantName title={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = ({ image }) => (
  <Image source={{ uri: image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = ({ title }) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {title}
  </Text>
);

const RestaurantDescription = ({ description }) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {description}
  </Text>
);
