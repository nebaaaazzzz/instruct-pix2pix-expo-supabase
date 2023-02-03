import "react-native-url-polyfill/auto"; //for supabase Error URL.hostname is not implemented

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box, extendTheme, Text, View } from "native-base";
import LoginScreen from "./src/screens/Login";
import InitialScreen from "./src/screens/Initial";
import { StatusBar } from "react-native";
import SignupScreen from "./src/screens/Signup";
import theme from "./src/theme";
import { Session } from "@supabase/supabase-js";
import { RootStackParamList } from "./src/navigation/type";
import Home from "./src/screens/Home";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import supabase from "./src/config/supabase";
import { useEffect, useState } from "react";
const RootStackNavigator = createStackNavigator<RootStackParamList>();

const prefix = Linking.createURL("/");
export default function App() {
  const linking = {
    prefixes: [prefix],
  };
  const [session, setSession] = useState<Session | undefined>();
  useEffect(() => {}, [
    (async () => {
      let storedSession = await SecureStore.getItemAsync("token");
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    })(),
  ]);
  supabase.auth.onAuthStateChange(async (event, sessionCb) => {
    if (event == "SIGNED_IN" || event == "TOKEN_REFRESHED") {
      await SecureStore.setItemAsync("session", JSON.stringify(sessionCb));
      setSession(sessionCb);
    }
    if (event == "USER_DELETED" || event == "SIGNED_OUT") {
      await SecureStore.setItemAsync("session", "");
      setSession(undefined);
    }
  });
  const customtheme = extendTheme(theme);
  return (
    <NativeBaseProvider theme={customtheme}>
      <View style={{ marginTop: StatusBar.currentHeight }} flex={1}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}
        >
          <RootStackNavigator.Navigator screenOptions={{ headerShown: false }}>
            {session ? (
              <RootStackNavigator.Screen name="home" component={Home} />
            ) : (
              <>
                <RootStackNavigator.Screen
                  name="initial"
                  component={InitialScreen}
                />
                <RootStackNavigator.Screen
                  name="login"
                  component={LoginScreen}
                />
                <RootStackNavigator.Screen
                  name="signup"
                  component={SignupScreen}
                />
              </>
            )}
          </RootStackNavigator.Navigator>
        </NavigationContainer>
      </View>
      <ExpoStatusBar style="auto" />
    </NativeBaseProvider>
  );
}
