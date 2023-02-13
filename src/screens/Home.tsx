import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, Ionicons, Fontisto } from "@expo/vector-icons";
import { HomeBottomParamList } from "navigation/type";
import CameraScreen from "./Camera";
import PromptScreen from "./Prompt";
import ChatScreen from "./Chat";
import StoriesScreen from "./Stories";
import RoastScreen from "./RoastScreen";
import AccountScreen from "./Account";
const HomeStackNavigator = createStackNavigator();
const HomeBottomNavigator = createBottomTabNavigator<HomeBottomParamList>();
const HomeStackNavigatorScreen = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen
        name="home"
        component={HomeBottomNavigatorScreen}
      />
      <HomeStackNavigator.Screen name="account" component={AccountScreen} />
    </HomeStackNavigator.Navigator>
  );
};
const HomeBottomNavigatorScreen = () => {
  return (
    <HomeBottomNavigator.Navigator
      initialRouteName="camerabottomtab"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "blue",
        headerShown: false,
      }}
    >
      <HomeBottomNavigator.Screen
        options={{
          tabBarLabel: "Chat",

          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "Messages",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbox"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
        component={ChatScreen}
        name="chatbottomtab"
      />
      <HomeBottomNavigator.Screen
        options={{
          lazy: false,
          freezeOnBlur: true,

          unmountOnBlur: true,
          tabBarLabel: "Camera",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="google-lens"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
        component={CameraBottomTabScreen}
        name="camerabottomtab"
      />
      <HomeBottomNavigator.Screen
        options={{
          tabBarLabel: "Stories",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
        component={StoriesScreen}
        name="storiesbottomtab"
      />
      <HomeBottomNavigator.Screen
        options={{
          tabBarLabel: "Roast",

          tabBarIcon: ({ focused }) => (
            <Fontisto name="play" size={24} color={focused ? "blue" : "gray"} />
          ),
        }}
        component={RoastScreen}
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
export default HomeStackNavigatorScreen;
