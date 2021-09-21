import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, View } from "react-native";
import RootNavigation from "./Navigation";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";

export default function App() {
  const store = configureStore();
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <ReduxProvider store={store}>
      <View style={{ backgroundColor: "#eee", flex: 1 }}>
        <RootNavigation />
      </View>
    </ReduxProvider>
  );
}
