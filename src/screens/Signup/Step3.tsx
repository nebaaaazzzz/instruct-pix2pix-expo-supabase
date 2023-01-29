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
  WarningOutlineIcon,
} from "native-base";
import React, { useState, useEffect } from "react";
const Step3 = () => {
  const [userName, setUserName] = useState("");
  /**
   * TODO
   *  - onType check if username is taken or not
   *
   */
  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
        <Heading fontWeight={"light"} mb="10">
          Pick a username
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
              User Name
            </FormControl.Label>

            <Input
              fontWeight={"bold"}
              type="text"
              bgColor={"white"}
              borderColor="black"
              placeholder="select your birth date"
              fontSize={"md"}
              borderTopWidth={"0"}
              borderLeftWidth={"0"}
              borderRightWidth={"0"}
            />
            <FormControl.HelperText>
              {/* change this to checking loading state to check if username taken or not */}
              cheaking
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              username already taken
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
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
        Continue
      </Button>
    </VStack>
  );
};

export default Step3;
