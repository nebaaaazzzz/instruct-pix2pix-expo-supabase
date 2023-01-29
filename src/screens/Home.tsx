import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Box, Button, Center, HStack, VStack } from "native-base";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const BottomNavigator = createBottomTabNavigator();
const Home = () => {
  return (
    <BottomNavigator.Navigator
      initialRouteName="Camera"
      screenOptions={{ headerShown: false }}
    >
      <BottomNavigator.Screen
        options={{
          tabBarIcon: () => (
            <FontAwesome name="map-marker" size={24} color="black" />
          ),
        }}
        component={CameraScreen}
        name="Maps"
      />
      <BottomNavigator.Screen
        options={{
          tabBarIcon: () => <Ionicons name="chatbox" size={24} color="black" />,
        }}
        component={CameraScreen}
        name="Chat"
      />
      <BottomNavigator.Screen
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="google-lens"
              size={24}
              color="black"
            />
          ),
        }}
        component={CameraScreen}
        name="Camera"
      />
      <BottomNavigator.Screen
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color="black"
            />
          ),
        }}
        component={CameraScreen}
        name="Stories"
      />
      <BottomNavigator.Screen
        options={{
          tabBarIcon: () => <Fontisto name="play" size={24} color="black" />,
        }}
        component={CameraScreen}
        name="Spotlight"
      />
    </BottomNavigator.Navigator>
  );
};
const CameraScreen = () => {
  const { height } = useWindowDimensions();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  useEffect(() => {
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, []);
  return (
    <Box flex={1} padding="0" bgColor="red.100">
      {permission?.granted ? (
        <Camera
          onCameraReady={() => setCameraReady(true)}
          style={{
            height,
            margin: 0,
            backgroundColor: cameraReady ? "gray" : "",
          }}
          type={type}
        >
          <VStack
            alignContent="stretch"
            justifyContent={"space-between"}
            flex={1}
          >
            <HStack
              alignItems="flex-start"
              justifyContent="space-between"
              mt="2"
            >
              <Center>
                <HStack ml="1">
                  <Center
                    borderRadius="full"
                    bgColor="black.100:alpha.20"
                    h="10"
                    w="10"
                    mr="2"
                  >
                    <FontAwesome name="user" size={30} color="red" />
                  </Center>
                  <Center
                    bgColor="black.100:alpha.20"
                    h="8"
                    w="8"
                    borderRadius="full"
                  >
                    <FontAwesome name="search" size={18} color="white" />
                  </Center>
                </HStack>
              </Center>
              <HStack>
                <HStack
                  bgColor="black.100:alpha.20"
                  alignSelf="flex-start"
                  h="10"
                  w="10"
                  borderRadius="full"
                  justifyContent="flex-start"
                  position="relative"
                  alignItems="center"
                >
                  <AntDesign
                    name="plus"
                    style={{ color: "white", marginVertical: 5 }}
                    size={14}
                    alignSelf="flex-start"
                    color="white"
                  />
                  <FontAwesome name="user" size={24} color="white" />
                </HStack>

                <VStack mr="2" ml="4">
                  <VStack
                    bgColor="black.100:alpha.20"
                    py="2"
                    px="2"
                    borderRadius="xl"
                    mb="2"
                  >
                    <MaterialCommunityIcons
                      name="camera-switch-outline"
                      size={24}
                      style={{ color: "white", marginVertical: 5 }}
                      color="white"
                    />
                    <MaterialCommunityIcons
                      name="lightning-bolt"
                      size={24}
                      style={{ color: "white", marginVertical: 5 }}
                      // color="white"
                    />
                    <Feather
                      name="video"
                      size={24}
                      style={{ color: "white", marginVertical: 5 }}
                      color="white"
                    />
                    <Fontisto
                      name="music-note"
                      style={{ color: "white", marginVertical: 5 }}
                      size={24}
                      color="white"
                    />
                    <AntDesign
                      name="plus"
                      style={{ color: "white", marginVertical: 5 }}
                      size={24}
                      color="white"
                    />
                    <AntDesign
                      name="pluscircle"
                      style={{ color: "white", marginVertical: 5 }}
                      size={24}
                      color="white"
                    />
                  </VStack>
                  <VStack
                    bgColor="black.100:alpha.20"
                    py="2"
                    px="2"
                    borderRadius="xl"
                    mb="2"
                  >
                    <AntDesign
                      name="scan1"
                      size={24}
                      style={{ color: "white", marginVertical: 5 }}
                      color="white"
                    />
                  </VStack>
                </VStack>
              </HStack>
            </HStack>
            <HStack
              mb="24"
              justifyContent="center"
              alignItems="center"
              bottom="0"
            >
              <Ionicons name="md-images" size={24} color="white" />
              <Button
                //   mb="2"
                borderRadius={"full"}
                w="20"
                h="20"
                style={{ backgroundColor: "transparent" }}
                marginX={"5"}
                borderColor={"white"}
                borderWidth={"4"}
              ></Button>
              <Fontisto name="smiley" size={24} color="white" />
            </HStack>
          </VStack>
        </Camera>
      ) : (
        "please allow camera"
      )}{" "}
    </Box>
  );
};
export default Home;
