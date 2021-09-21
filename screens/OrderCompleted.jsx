import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView } from "react-native";
import MenuItems from "../components/RestaurantDetails/MenuItems";
import firebase from "../firebase";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({});

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingBottom: 80 }}
    >
      <StatusBar style="dark" translucent={false} backgroundColor="white" />
      <View style={{ margin: 17, alignItems: "center" }}>
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 15 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 30 }}>
          Your Order at {lastOrder.restaurantName} has been placed for $
          {lastOrder.total}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {lastOrder.items && (
            <MenuItems hideCheckbox={true} foods={lastOrder.items} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
