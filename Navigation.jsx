import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import Login from "./screens/Login";

import BottomTabs from "./components/BottomTabs";
import OrderCompleted from "./screens/OrderCompleted";
import { useSelector } from "react-redux";
import Orders from "./screens/Orders";
import Payment from "./screens/Payment";

export default function RootNavigation() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const isBottomNavBar = useSelector((state) => state.bottomNavReducer);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
      </Stack.Navigator>
      {isBottomNavBar && <BottomTabs />}
    </NavigationContainer>
  );
}
