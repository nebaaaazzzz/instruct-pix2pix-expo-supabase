import React from "react";
import { Box, Button, HStack, Image, VStack } from "native-base";
//verysecuredatabasepassword
const InitialScreen = () => {
  return (
    <VStack
      flex="1"
      justifyContent={"space-between"}
      alignItems="center"
      backgroundColor={"primary.900"}
    >
      <Box></Box>
      <Image
        source={require("../../assets/snapchat.png")}
        alt="img nor found"
        width={100}
        height={100}
      />
      <HStack alignSelf={"stretch"} mb={5} px="5" justifyContent="center">
        <Button.Group size="lg">
          <Button
            bgColor={"white"}
            width="1/2"
            shadow={"3"}
            rounded={"2xl"}
            _text={{ color: "black", bold: true }}
          >
            Login
          </Button>
          <Button
            shadow={"3"}
            width="1/2"
            _text={{
              bold: true,
            }}
            bgColor="darkBlue.400"
            rounded={"2xl"}
          >
            SignUp
          </Button>
        </Button.Group>
      </HStack>
    </VStack>
  );
};

export default InitialScreen;
