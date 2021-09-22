import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: "row",
    padding: 8,
    paddingHorizontal: 35,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  bottomTabIcon: { paddingBottom: 2, alignSelf: "center" },
  bottomTabText: { color: "#2E3C43" },
  profileImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  bottomSheetHeader: {
    backgroundColor: "#fafafa",
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -9,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginTop: 19,
  },
  bottomSheetContainer: {
    height: 330 - 40,
    backgroundColor: "#fafafa",
    paddingTop: 25,
    alignItems: "center",
  },
  sheetProfileImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  sheetProfileName: {
    fontSize: 20,
    marginTop: 19,
  },
  sheetProfileEmail: {
    fontSize: 17,
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
  },
});

const BottomTabs = () => {
  const userInfo = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const bottomSheet = useRef();
  const animatedValue = new Animated.Value(1);

  const logOut = () => {
    dispatch({
      type: "LOG_OUT_USER",
    });
    auth.signOut();
    navigation.navigate("Login");
  };

  const renderBottomSheet = () => (
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
  );

  const renderBottomSheetHeader = () => (
    <View style={styles.bottomSheetHeader}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <>
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[330, 0]}
        initialSnap={1}
        callbackNode={animatedValue}
        enabledGestureInteraction={true}
        renderContent={renderBottomSheet}
        renderHeader={renderBottomSheetHeader}
        enabledContentTapInteraction={false}
      />
      <View style={styles.bottomTabContainer}>
        <Icon icon="home" text="Home" />
        <Icon icon="search" text="Browse" route="Home" />
        <Icon icon="receipt" text="Orders" />
        <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
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
      rippleColor="rgba(0, 0, 0, .32)"
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
