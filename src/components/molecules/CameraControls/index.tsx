import React from "react";
import { HStack, VStack, Center, IconButton, Icon } from "native-base";
import {
  AntDesign,
  Fontisto,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GestureResponderEvent } from "react-native";
const CameraControls = ({
  toggleCamera,
}: {
  toggleCamera: (event: GestureResponderEvent) => null;
}) => {
  return (
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
};

export default CameraControls;
