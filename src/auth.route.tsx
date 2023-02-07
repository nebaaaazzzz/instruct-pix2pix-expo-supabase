import { View, Text } from "react-native";
import React from "react";
import { RootStackNavigatorType } from "./navigation";
import Home from "./screens/Home";
const authRoute = (RootStackNavigator: RootStackNavigatorType) => {
  return <RootStackNavigator.Screen name="home" component={Home} />;
};

export default authRoute;
