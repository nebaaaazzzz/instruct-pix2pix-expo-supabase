import { Text, View } from "react-native";
import React from "react";
import InitialScreen from "./screens/Initial";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import { TypedNavigator } from "@react-navigation/native";
import { RootStackNavigator } from "./navigation";
type RootStackNavigatorType = typeof RootStackNavigator;
const nonAuthRoute = (RootStackNavigator: RootStackNavigatorType) => {
  return (
    <>
      <RootStackNavigator.Screen name="initial" component={InitialScreen} />
      <RootStackNavigator.Screen name="login" component={LoginScreen} />
      <RootStackNavigator.Screen name="signup" component={SignupScreen} />
    </>
  );
};

export default nonAuthRoute;
