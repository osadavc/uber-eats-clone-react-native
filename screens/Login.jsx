import React, { useEffect, useState } from "react";
import { useNavigation, StackActions } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { logInAsync } from "expo-google-app-auth";
import { auth, firestore } from "../firebase";
import firebase from "firebase";
import { isUserEqual } from "../utils/isUserEqual";

import { useDispatch } from "react-redux";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  loginButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 2,
  },
  loadingContainer: {
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
  },
  lottieLoader: {
    height: 200,
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({
      type: "HIDE",
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SHOW",
        });
        dispatch({
          type: "LOG_IN_USER",
          payload: user.providerData[0],
        });
        navigation.dispatch(StackActions.replace("Home"));
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInFail = () => {
    Alert.alert("Sign In Failed", "Sign In Failed, Please Try Again Later");
  };

  const onSignIn = (googleUser) => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        auth
          .signInWithCredential(credential)
          .then((res) => {
            if (res.additionalUserInfo.isNewUser) {
              firestore.collection("users").doc(res.user.uid).set({
                email: res.user.email,
                displayName: res.user.displayName,
                photo_url: res.user.photoURL,
              });
            }
          })
          .catch(() => {
            signInFail();
          });
      }
    });
  };

  const signIn = async () => {
    try {
      const result = await logInAsync({
        androidClientId:
          "667022099483-63eedj1ivosh8ab7p7smbciibbmqvo5g.apps.googleusercontent.com",
        iosClientId:
          "667022099483-h4pn9gel3grjvhmu177kpciupg17mnfm.apps.googleusercontent.com",
        scopes: ["profile", "email"],
        language: "en-GB",
      });

      if (result.type === "success") {
        onSignIn(result);
      } else {
        signInFail();
      }
    } catch (e) {
      signInFail();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <>
          <View style={styles.loadingContainer}>
            <LottieView
              style={styles.lottieLoader}
              source={require("../assets/animations/scanner.json")}
              autoPlay
              speed={3}
            />
          </View>
        </>
      ) : (
        <>
          <StatusBar />
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.5}
            onPress={signIn}
          >
            <AntDesign name="google" size={21} color="white" />
            <Text style={styles.loginText}>Login With Google</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;
