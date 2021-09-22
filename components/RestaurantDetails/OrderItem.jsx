import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderTitle: {
    fontWeight: "600",
    fontSize: 16,
    flexShrink: 1,
  },
  orderPrice: {
    opacity: 0.7,
    fontSize: 16,
  },
});

const OrderItem = ({ item }) => {
  const { title, price } = item;

  return (
    <View style={styles.orderItemContainer}>
      <Text style={styles.orderTitle}>{title}</Text>
      <Text style={styles.orderPrice}>{price}</Text>
    </View>
  );
};

export default OrderItem;
