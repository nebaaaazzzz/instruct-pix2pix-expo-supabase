import { ActivityIndicator } from "react-native";
import { Center } from "native-base";
import React from "react";
const Loading = () => {
  return (
    <Center style={{ flex: 1 }}>
      <ActivityIndicator size="large" color="#000" />
    </Center>
  );
};

export default Loading;
