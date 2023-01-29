import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box, extendTheme, Text, View } from "native-base";
import LoginScreen from "./src/screens/Login";
import InitialScreen from "./src/screens/Initial";
import Step1 from "./src/screens/Signup/Step1";
import Step2 from "./src/screens/Signup/Step2";
import { StatusBar } from "react-native";
import Home from "./src/screens/Home";
import Step3 from "./src/screens/Signup/Step3";
import Step4 from "./src/screens/Signup/Step4";
const StackNavigator = createStackNavigator();
export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        900: "#ffff00",
        800: "#854d0e",
        700: "#a16207",
        600: "#ca8a04",
        500: "#eab308",
        400: "#facc15",
        300: "#fde047",
        200: "#fef08a",
        100: "#fef9c3",
        50: "#fefce8",
      },
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <View style={{ marginTop: StatusBar.currentHeight }} flex={1}>
        <NavigationContainer>
          <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <StackNavigator.Screen name="home/" component={Home} />
            <StackNavigator.Screen name="signup/step4" component={Step4} />
            <StackNavigator.Screen name="signup/step3" component={Step3} />
            <StackNavigator.Screen name="signup/step2" component={Step2} />
            <StackNavigator.Screen name="signup/step1" component={Step1} />
            <StackNavigator.Screen name="login" component={LoginScreen} />
            <StackNavigator.Screen name="initial" component={InitialScreen} />
          </StackNavigator.Navigator>
        </NavigationContainer>
      </View>
      <ExpoStatusBar style="auto" />
    </NativeBaseProvider>
  );
}
