import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";

export default function RootNavigation() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const store = configureStore();

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
