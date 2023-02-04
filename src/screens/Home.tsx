import { createRef, useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Box,
  Button,
  Center,
  Image,
  HStack,
  Icon,
  IconButton,
  VStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  TextArea,
} from "native-base";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  useWindowDimensions,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createStackNavigator } from "@react-navigation/stack";
import supabase from "../config/supabase";
const BottomNavigator = createBottomTabNavigator();
const Home = () => {
  return (
    <BottomNavigator.Navigator
      initialRouteName="Camera"
      screenOptions={{
        headerShown: false,
      }}
    >
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
        name="Roast"
      />
    </BottomNavigator.Navigator>
  );
};
const PromptScreen = (props: any) => {
  const { imgUrl }: { imgUrl: string } = props.route.params;
  const [fetchedUrl, setFetchedUrl] = useState("");
  const splittedUrl = fetchedUrl ? fetchedUrl.split("/") : imgUrl.split("/");
  const fileName: string = splittedUrl[splittedUrl.length - 1];
  const [prompt, setPrompt] = useState("");
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const splittedFileName = fileName.split(".");
  const mimeType = "image/" + splittedFileName[splittedFileName.length - 1];
  formData.append("prompt", prompt);
  formData.append("file", {
    uri: imgUrl,
    type: mimeType,
    name: fileName,
  });
  const handleSubmit = async () => {
    console.log(await supabase.auth.getSession());
    // setIsLoading(true);
    try {
      // const { url } = await (
      //   await fetch("http://192.168.43.136:8000/", {
      //     body: formData,
      //     method: "post",
      //     headers: {
      //       "X_SUPABASE_ACCESS_TOKEN" : "" ,
      //       "content-type": "multipart/form-data",
      //     },
      //   })
      // ).json();
      // setFetchedUrl(url);
    } catch (err) {
      console.log(err.code);
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <Center flex={1}>
        <ActivityIndicator size="large" color="black" />
      </Center>
    );
  }
  return (
    <VStack
      flex={1}
      bg="white"
      onTouchStart={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Image
          source={{ uri: fetchedUrl ? fetchedUrl : imgUrl }}
          alt="img"
          my="1.5"
          height={"70%"}
          resizeMode="contain"
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextArea
            autoCapitalize="none"
            onChangeText={setPrompt}
            value={prompt}
            mx="3"
            placeholder="prompt"
          />
          <Button my="2" mx="3" bg="blue.500" onPress={handleSubmit}>
            Submit
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </VStack>
  );
};
const FetchCameraScreen = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const { height } = useWindowDimensions();
  const [currentCameraType, setCurrentCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    setIsCameraReady(false);
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, []);
  const toggleCamera = () => {
    let type =
      currentCameraType == CameraType.back ? CameraType.front : CameraType.back;
    setCurrentCameraType(type);
  };
  const cameraRef = createRef<Camera>();
  return (
    <Box flex={1} padding="0" bgColor="red.100">
      {permission?.granted ? (
        <Camera
          onMountError={() => {
            console.log("mount error occured");
          }}
          ref={cameraRef}
          onCameraReady={() => setIsCameraReady(true)}
          style={{
            flex: 1,
            height,
            backgroundColor: isCameraReady ? "gray" : "",
          }}
          type={currentCameraType}
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
                    borderRadius="xl"
                    mb="2"
                  >
                    <IconButton
                      onPress={() => toggleCamera()}
                      _pressed={{
                        bgColor: "black.100:alpha.10",
                      }}
                      _icon={{
                        color: "white",
                      }}
                      icon={
                        <Icon
                          size={6}
                          as={MaterialCommunityIcons}
                          name="camera-switch-outline"
                        />
                      }
                    />
                    <IconButton
                      _pressed={{
                        bgColor: "black.100:alpha.10",
                      }}
                      _icon={{
                        color: "white",
                      }}
                      icon={
                        <Icon
                          size={6}
                          as={MaterialCommunityIcons}
                          name="lightning-bolt"
                        />
                      }
                    />
                    <IconButton
                      _pressed={{
                        bgColor: "black.100:alpha.10",
                      }}
                      _icon={{
                        color: "white",
                      }}
                      icon={<Icon size={6} as={Fontisto} name="music-note" />}
                    />
                    <IconButton
                      _pressed={{
                        bgColor: "black.100:alpha.10",
                      }}
                      _icon={{
                        color: "white",
                      }}
                      icon={<Icon size={6} as={Feather} name="video" />}
                    />
                    <IconButton
                      _pressed={{
                        bgColor: "black.100:alpha.10",
                      }}
                      _icon={{
                        color: "white",
                      }}
                      icon={<Icon size={6} as={AntDesign} name="plus" />}
                    />
                    <IconButton
                      _pressed={{
                        bgColor: "black.100:alpha.10",
                      }}
                      _icon={{
                        color: "white",
                      }}
                      icon={<Icon size={6} as={AntDesign} name="pluscircle" />}
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
              mb="2"
              justifyContent="center"
              alignItems="center"
              bottom="0"
            >
              <IconButton
                onPress={async () => {
                  // No permissions request is necessary for launching the image library
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,

                    aspect: [4, 3],
                    quality: 1,
                  });
                  if (result.assets) {
                    props.navigation.navigate("prompt", {
                      imgUrl: result.assets[0].uri,
                      fileName: result.assets[0].fileName,
                    });
                  } else {
                    // the user cancled
                  }
                  if (!result.canceled) {
                  }
                }}
                icon={<Ionicons name="md-images" size={24} color="white" />}
              />
              <Button
                isDisabled={!isCameraReady}
                onPress={async () => {
                  cameraRef.current?.s;
                  const capturedImage =
                    await cameraRef.current?.takePictureAsync({
                      quality: 1,
                    });
                  props.navigation.navigate("prompt", {
                    imgUrl: capturedImage?.uri,
                  });
                }}
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
const CameraStackNavigator = createStackNavigator();
const CameraScreen = () => {
  return (
    <CameraStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <CameraStackNavigator.Screen component={FetchCameraScreen} name="fetch" />
      <CameraStackNavigator.Screen component={PromptScreen} name="prompt" />
    </CameraStackNavigator.Navigator>
  );
};
export default Home;
