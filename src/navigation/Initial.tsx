import { View, Text } from "react-native";
import React from "react";
import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import { RootStackNavigator } from ".";
import authRoute from "src/auth.route";
import nonAuthRoute from "src/nonAuth.route";
import Loading from "components/atoms/Loading";
import { Session } from "@supabase/supabase-js";
const prefix = Linking.createURL("/");
const linking = {
  prefixes: [prefix],
};
const Initial = ({ session }: { session: Session | null }) => {
  return (
    <NavigationContainer linking={linking} fallback={<Loading />}>
      <RootStackNavigator.Navigator screenOptions={{ headerShown: false }}>
        {session
          ? authRoute(RootStackNavigator)
          : nonAuthRoute(RootStackNavigator)}
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Initial;
