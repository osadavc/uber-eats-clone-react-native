import React, { useState } from "react";
import { LogBox, View } from "react-native";
import RootNavigation from "./Navigation";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFont = async () => {
  await Font.loadAsync({
    Nunito: require("./assets/fonts/Nunito.ttf"),
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setFontLoaded(true)}
        onError={() => {}}
      />
    );
  }

  const store = configureStore();
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <ReduxProvider store={store}>
      <View style={{ backgroundColor: "#eee", flex: 1 }}>
        <RootNavigation />
      </View>
    </ReduxProvider>
  );
};

export default App;
