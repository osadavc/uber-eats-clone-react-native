import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: "row",
    padding: 8,
    paddingHorizontal: 35,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  bottomTabIcon: { paddingBottom: 2, alignSelf: "center" },
  bottomTabText: { color: "#2E3C43", fontFamily: "Nunito" },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },

  bottomSheetContainer: {
    height: 330 - 40,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  sheetProfileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  sheetProfileName: {
    fontSize: 20,
    marginTop: 19,
    fontFamily: "Nunito",
  },
  sheetProfileEmail: {
    fontSize: 17,
    fontFamily: "Nunito",
  },
  sheetLogOut: {
    marginTop: 30,
    paddingHorizontal: 35,
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 12,
  },
  sheetLogOutText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito",
  },
});

const BottomTabs = () => {
  const userInfo = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const logOut = () => {
    dispatch({
      type: "LOG_OUT_USER",
    });
    auth.signOut();
    navigation.navigate("Login");
  };

  const renderBottomSheet = () => (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <View style={styles.bottomSheetContainer}>
          <Image
            source={{ uri: userInfo.photoURL }}
            style={styles.sheetProfileImage}
          />
          <Text style={styles.sheetProfileName}>{userInfo.displayName}</Text>
          <Text style={styles.sheetProfileEmail}>{userInfo.email}</Text>
          <TouchableOpacity
            style={styles.sheetLogOut}
            activeOpacity={0.8}
            onPress={logOut}
          >
            <Text style={styles.sheetLogOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {renderBottomSheet()}
      </Modal>
      <View style={styles.bottomTabContainer}>
        <Icon icon="home" text="Home" />
        <Icon icon="search" text="Browse" route="Home" />
        <Icon icon="receipt" text="Orders" route="Orders" />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View>
            <Image
              source={{ uri: userInfo.photoURL }}
              style={[styles.profileImage, styles.bottomTabIcon]}
            />
            <Text style={styles.bottomTabText}>Account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Icon = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.route) {
          navigation.navigate(props.route);
        }
      }}
    >
      <View>
        <FontAwesome5
          name={props.icon}
          size={21}
          style={styles.bottomTabIcon}
          color="#2E3C43"
        />
        <Text style={styles.bottomTabText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BottomTabs;
