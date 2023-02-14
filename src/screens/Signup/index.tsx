import React, { createContext } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { createStackNavigator } from "@react-navigation/stack";
import { SignupStackParamList } from "../../navigation/type";
const SignupStackNavigator = createStackNavigator<SignupStackParamList>();
const SignupScreen = () => {
  return (
    <SignupStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <SignupStackNavigator.Screen name="signup/step1" component={Step1} />
      <SignupStackNavigator.Screen name="signup/step2" component={Step2} />
      <SignupStackNavigator.Screen name="signup/step3" component={Step3} />
    </SignupStackNavigator.Navigator>
  );
};

export default SignupScreen;
