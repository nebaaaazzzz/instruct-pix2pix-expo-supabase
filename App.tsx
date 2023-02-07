import "react-native-url-polyfill/auto"; //for supabase Error URL.hostname is not implemented

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme, View } from "native-base";
import { StatusBar } from "react-native";
import theme from "src/theme";
import useAuth from "hooks/useAuth";
import Loading from "components/atoms/Loading";
import Initial from "src/navigation/Initial";

export default function App() {
  const { session, isLoading } = useAuth();
  const customtheme = extendTheme(theme);
  return (
    <NativeBaseProvider theme={customtheme}>
      <View style={{ marginTop: StatusBar.currentHeight }} flex={1}>
        {isLoading ? <Loading /> : <Initial session={session} />}
      </View>
      <ExpoStatusBar style="auto" />
    </NativeBaseProvider>
  );
}
