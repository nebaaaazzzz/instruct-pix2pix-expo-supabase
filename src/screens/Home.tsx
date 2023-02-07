import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, Ionicons, Fontisto } from "@expo/vector-icons";
import { HomeBottomParamList } from "navigation/type";
import CameraScreen from "./Camera";
import PromptScreen from "./Prompt";

const HomeBottomNavigator = createBottomTabNavigator<HomeBottomParamList>();
const Home = () => {
  return (
    <HomeBottomNavigator.Navigator
      initialRouteName="chatbottomtab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeBottomNavigator.Screen
        options={{
          tabBarIcon: () => <Ionicons name="chatbox" size={24} color="black" />,
        }}
        component={CameraBottomTabScreen}
        name="chatbottomtab"
      />
      <HomeBottomNavigator.Screen
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="google-lens"
              size={24}
              color="black"
            />
          ),
        }}
        component={CameraBottomTabScreen}
        name="camerabottomtab"
      />
      <HomeBottomNavigator.Screen
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color="black"
            />
          ),
        }}
        component={CameraBottomTabScreen}
        name="storiesbottomtab"
      />
      <HomeBottomNavigator.Screen
        options={{
          tabBarIcon: () => <Fontisto name="play" size={24} color="black" />,
        }}
        component={CameraBottomTabScreen}
        name="roastbottomtab"
      />
    </HomeBottomNavigator.Navigator>
  );
};
const CameraStackNavigator = createStackNavigator();
const CameraBottomTabScreen = () => {
  return (
    <CameraStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CameraStackNavigator.Screen component={CameraScreen} name="fetch" />
      <CameraStackNavigator.Screen component={PromptScreen} name="prompt" />
    </CameraStackNavigator.Navigator>
  );
};
export default Home;
