import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#eee",
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontFamily: "NunitoBold",
    fontSize: 20,
  },
  time: {
    fontFamily: "Nunito",
    color: "#374151",
    fontSize: 17,
  },
  count: {
    fontFamily: "Nunito",
  },
  image: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
    borderRadius: 12,
    marginTop: 15,
  },
  price: {
    fontFamily: "Nunito",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
});

const SingleOrder = ({
  restaurantName,
  total,
  time,
  restaurantImage,
  itemCount,
}) => {
  return (
    <View style={styles.orderContainer}>
      <Text style={styles.name}>{restaurantName}</Text>
      <Text style={styles.time}>
        {new Date(time?.toDate()).toLocaleString()}
      </Text>
      <Text style={styles.count}>{itemCount} Item</Text>
      <Image source={{ uri: restaurantImage }} style={styles.image} />
      <Text style={styles.price}>Sub Total - ${total?.toFixed(2)}</Text>
    </View>
  );
};

export default SingleOrder;
