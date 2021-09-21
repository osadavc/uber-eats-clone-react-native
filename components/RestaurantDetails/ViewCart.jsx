import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import LottieView from "lottie-react-native";

export default function ViewCart() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const isBottomNavBar = useSelector((state) => state.bottomNavReducer);

  const dispatch = useDispatch();

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);

  const checkoutOrder = () => {
    setLoading(true);
    dispatch({
      type: "HIDE",
    });
    firebase
      .firestore()
      .collection("orders")
      .add({
        items,
        restaurantName,
        total: Number(total),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTimeout(() => {
          navigation.navigate("OrderCompleted");
          dispatch({
            type: "CLEAR_ALL",
          });
          dispatch({
            type: "SHOW",
          });
          setLoading(false);
        }, 2500);
      });
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 20,
    },
    subTotalContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 30,
    },
    subTotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const checkOutModalContent = () => {
    return (
      <>
        <StatusBar hidden={true} backgroundColor="rgba(0,0,0,0.7)" />
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
              <View style={styles.subTotalContainer}>
                <Text style={styles.subTotalText}>Subtotal</Text>
                <Text style={styles.subTotalText}>${total}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    checkoutOrder();
                    setModalVisible(false);
                  }}
                  style={{
                    marginTop: 20,
                    alignItems: "center",
                    padding: 13,
                    borderRadius: 30,
                    width: 300,
                    backgroundColor: "black",
                    marginBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>Checkout</Text>
                  <Text
                    style={{
                      position: "absolute",
                      right: 20,
                      color: "white",
                      fontSize: 15,
                      top: 16,
                    }}
                  >
                    ${total}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
    );
  };

  if (total == "0.00") {
    return <></>;
  }

  return (
    <>
      {loading ? (
        <>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              top: 0,
              backgroundColor: "black",
              opacity: 0.6,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flex: 1,
            }}
          >
            <StatusBar hidden={true} />
            <LottieView
              style={{ height: 200 }}
              source={require("../../assets/animations/scanner.json")}
              autoPlay
              speed={3}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          bottom: "2%",
          zIndex: 999,
        }}
      >
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          {checkOutModalContent()}
        </Modal>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {isBottomNavBar && (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                borderRadius: 30,
                width: 300,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: 30,
                }}
              >
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>${total}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
