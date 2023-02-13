import { useWindowDimensions } from "react-native";
import { useState, useEffect, createRef } from "react";
import { HStack, IconButton, Box, Button, Text, VStack } from "native-base";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-image-picker";
import CameraControls from "components/molecules/CameraControls";
const imagePickerConfig: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

const CameraScreen = (props) => {
  const [isGranted, setIsGranted] = useState(false);
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
      setIsGranted(true);
    } else {
      setIsGranted(false);
    }
  }, []);
  return (
    <Box flex={1} padding="0">
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
        {!isCameraReady ? null : (
          <VStack
            alignContent="stretch"
            justifyContent={"space-between"}
            flex={1}
          >
            <CameraControls toggleCamera={toggleCamera} />

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
        )}
      </Camera>
    </Box>
  );
};
export default CameraScreen;
