import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import MenuItems from "../components/RestaurantDetails/MenuItems";

const styles = StyleSheet.create({
  orderCompletedContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 80,
  },
  contentContainer: {
    margin: 17,
    alignItems: "center",
  },
  lottieTick: {
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
  },
  orderText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
});

const OrderCompleted = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.orderCompletedContainer}>
      <StatusBar style="dark" translucent={false} backgroundColor="white" />
      <View style={styles.contentContainer}>
        <LottieView
          style={styles.lottieTick}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={styles.orderText}>
          Your Order at {route.params.restaurantName} has been placed for $
          {route.params.total}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {route.params.items && (
            <MenuItems hideCheckbox={true} foods={route.params.items} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderCompleted;
