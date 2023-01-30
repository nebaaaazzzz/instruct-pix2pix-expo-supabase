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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { SignUpStep1Props } from "../../navigation/type";
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});
const Step1 = ({ route, navigation }: SignUpStep1Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    navigation.navigate("signup/step2", {
      firstName,
      lastName,
    });
  };
  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
        <Heading fontWeight={"light"} mb="10">
          What's Your name?
        </Heading>
        <FormControl
          isInvalid={Boolean(errors.firstName)}
          _text={{
            color: "darkBlue.400",
          }}
        >
          <Stack mx="4">
            <FormControl.Label
              _text={{
                color: "darkBlue.400",
              }}
            >
              First Name
            </FormControl.Label>

            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  fontWeight={"bold"}
                  type="text"
                  _focus={{
                    bg: "white",
                    borderColor: "black",
                  }}
                  fontSize={"md"}
                  borderTopWidth={"0"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderLeftWidth={"0"}
                  borderRightWidth={"0"}
                  defaultValue=""
                  placeholder=""
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.firstName?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors.lastName)}>
          <Stack mx="4">
            <FormControl.Label
              _astrick={{
                display: "none",
              }}
              _text={{
                color: "darkBlue.400",
              }}
            >
              Last Name
            </FormControl.Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  fontWeight={"bold"}
                  type="text"
                  _focus={{
                    bg: "white",
                    borderColor: "black",
                  }}
                  fontSize={"md"}
                  borderTopWidth={"0"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderLeftWidth={"0"}
                  borderRightWidth={"0"}
                  defaultValue=""
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.lastName?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        <Text lineHeight={"xs"} mt="8" color="gray.500">
          By taping Sign Up & Accep, you acknowledge that you have read the
          Privacy Policy and agree to the
          <Text color="darkBlur.400">Terms of Service</Text>
        </Text>
      </Center>
      <Button
        onPress={handleSubmit(onSubmit)}
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
