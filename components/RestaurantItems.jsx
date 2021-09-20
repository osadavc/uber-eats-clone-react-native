import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const localRestaurants = [
  {
    name: "Farmhouse Kitchen Thai Cuisine",
    image_url:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    category: ["cafe", "bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
];

export default function RestaurantItems({ restaurantData }) {
  return (
    <View>
      {restaurantData?.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: 10 }}
          key={index}
        >
          <View style={{ marginTop: 5, padding: 15, backgroundColor: "white" }}>
            <RestaurantImage image={item.image_url} />
            <RestaurantInfo name={item.name} rating={item.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const RestaurantImage = (props) => (
  <>
    <Image
      source={{
        uri:
          props.image === ""
            ? "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            : props.image,
      }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
