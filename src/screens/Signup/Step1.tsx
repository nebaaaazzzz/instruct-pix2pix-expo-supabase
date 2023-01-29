import {
  Actionsheet,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";

const Step1 = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
        <Heading fontWeight={"light"} mb="10">
          What's Your name?
        </Heading>
        <FormControl
          isRequired
          _text={{
            color: "darkBlue.400",
          }}
        >
          <Stack mx="4">
            <FormControl.Label
              _astrick={{
                display: "none",
              }}
              _text={{
                color: "darkBlue.400",
              }}
            >
              First Name
            </FormControl.Label>

            <Input
              fontWeight={"bold"}
              type="text"
              _focus={{
                bg: "white",
                borderColor: "black",
              }}
              fontSize={"md"}
              borderTopWidth={"0"}
              borderLeftWidth={"0"}
              borderRightWidth={"0"}
              defaultValue=""
              placeholder=""
            />
          </Stack>
        </FormControl>

        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label
              _astrick={{
                display: "none",
              }}
              _text={{
                color: "darkBlue.400",
              }}
            >
              Password
            </FormControl.Label>
            <Input
              fontWeight={"bold"}
              _focus={{
                bg: "white",
                borderColor: "black",
              }}
              borderTopWidth={"0"}
              borderLeftWidth={"0"}
              borderRightWidth={"0"}
              type={"text"}
              placeholder=""
            />
          </Stack>
        </FormControl>
        <Text lineHeight={"xs"} color="gray.500">
          By taping Sign Up & Accep, you acknowledge that you have read the
          Privacy Policy and agree to the
          <Text color="darkBlur.400">Terms of Service</Text>
        </Text>
      </Center>
      <Button
        isDisabled
        _text={{
          my: "1.5",
        }}
        borderRadius={"3xl"}
        backgroundColor="darkBlue.400"
        _disabled={{
          _text: {
            color: "black",
          },
          bg: "darkBlue.100",
        }}
        mx="10"
        mb="5"
      >
        SIgnup & Accept
      </Button>
    </VStack>
  );
};

export default Step1;
