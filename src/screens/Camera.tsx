import { GestureResponderEvent, useWindowDimensions } from "react-native";
import { useState, useEffect, createRef } from "react";
import {
  Center,
  HStack,
  IconButton,
  Box,
  Button,
  VStack,
  Icon,
} from "native-base";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-image-picker";
import Loading from "components/atoms/Loading";
const imagePickerConfig: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};
const Side = ({
  toggleCamera,
}: {
  toggleCamera: (event: GestureResponderEvent) => void;
}) => (
  <HStack alignItems="flex-start" justifyContent="space-between" mt="2">
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
        <Center bgColor="black.100:alpha.20" h="8" w="8" borderRadius="full">
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
        <VStack bgColor="black.100:alpha.20" py="2" borderRadius="xl" mb="2">
          <IconButton
            onPress={toggleCamera}
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
);
const CameraScreen = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const { height } = useWindowDimensions();
  const [currentCameraType, setCurrentCameraType] = useState(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    setIsCameraReady(false);
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, []);
  const handleCameraCapture = async () => {
    const capturedImage = await cameraRef.current?.takePictureAsync({
      quality: 1,
    });
    props.navigation.navigate("prompt", {
      imgUrl: capturedImage?.uri,
    });
  };
  const handleGalleryImageSelect = async () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isGranted, setIsGranted] = useState(false);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync(imagePickerConfig);
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
  };
  const toggleCamera = () => {
    let type =
      currentCameraType == CameraType.back ? CameraType.front : CameraType.back;
    setCurrentCameraType(type);
  };
  const cameraRef = createRef<Camera>();
  useEffect(() => {
    if (permission?.granted) {
      setIsLoading(false);
      setIsGranted(true);
    } else {
      setIsLoading(false);
      setIsGranted(false);
    }
  }, []);
  return (
    <Box flex={1} padding="0" bgColor="red.100">
      {isLoading ? (
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
            <Side toggle={toggleCamera} />

            <HStack
              mb="2"
              justifyContent="center"
              alignItems="center"
              bottom="0"
            >
              <IconButton
                onPress={handleGalleryImageSelect}
                icon={<Ionicons name="md-images" size={24} color="white" />}
              />
              <Button
                isDisabled={!isCameraReady}
                onPress={handleCameraCapture}
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
        <Loading />
      )}
    </Box>
  );
};
export default CameraScreen;
