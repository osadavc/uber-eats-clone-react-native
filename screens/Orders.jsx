import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import SingleOrder from "../components/Orders/SingleOrder";
import SkeletonContent from "react-native-skeleton-content";

import { firestore } from "../firebase";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  lottieOrder: {
    height: 250,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 21,
    textAlign: "center",
    fontFamily: "Nunito",
  },
  ordersContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  skeletonContent: {
    width: "100%",
    flex: 1,
  },
});

const Orders = () => {
  const [orders, setOrders] = useState([{}, {}]);
  const [isLoading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.authReducer);

  useEffect(() => {
    firestore
      .collection("orders")
      .where("user", "==", userInfo.email)
      .orderBy("createdAt", "desc")
      .get()
      .then((QuerySnapShot) => {
        setOrders([]);
        QuerySnapShot.docs.forEach((doc) => {
          setOrders((prevOrders) => [...prevOrders, doc.data()]);
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      <StatusBar />
      <ScrollView style={styles.mainContainer}>
        <LottieView
          style={styles.lottieOrder}
          source={require("../assets/animations/food-delivery.json")}
          autoPlay
          speed={0.5}
          loop
        />
        <Text style={styles.title}>Your Previous Orders</Text>
        <View style={styles.ordersContainer}>
          {orders.length === 0 ||
            orders?.map((order, index) => (
              <TouchableOpacity key={index} activeOpacity={0.7}>
                <SkeletonContent
                  containerStyle={[
                    { padding: isLoading ? 17 : 0 },
                    styles.skeletonContent,
                  ]}
                  boneColor="#fff"
                  highlightColor="#eee"
                  isLoading={isLoading}
                  layout={[
                    {
                      key: "title",
                      width: 100,
                      height: 20,
                      marginBottom: 6,
                      borderRadius: 5,
                    },
                    {
                      key: "time",
                      width: 200,
                      height: 20,
                      marginBottom: 6,
                      borderRadius: 5,
                    },
                    {
                      key: "count",
                      width: 50,
                      height: 20,
                      marginBottom: 6,
                      borderRadius: 5,
                    },
                    {
                      key: "image",
                      width: "100%",
                      height: 200,
                      marginBottom: 6,
                      borderRadius: 12,
                    },
                    {
                      key: "total",
                      width: 100,
                      height: 20,
                      marginBottom: 6,
                      borderRadius: 5,
                      textAlign: "center",
                    },
                  ]}
                >
                  <SingleOrder
                    restaurantName={order.restaurantName}
                    restaurantImage={order.restaurantPhoto}
                    total={order.total}
                    time={order.createdAt}
                    itemCount={orders.length}
                  />
                </SkeletonContent>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Orders;
