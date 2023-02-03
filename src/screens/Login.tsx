import {
  Actionsheet,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  useDisclose,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Cellular from "expo-cellular";
import countries from "../data/country";
import supabase from "./../config/supabase";
import { LoginScreenProps } from "../navigation/type";
import { handleGoogleLogin } from "../utils/auth";
import GoogleSigninButton from "../components/molecules/GoogleSigninButton";
/**
 *
 * TODO
 *  -add phone sign up (base structure added only some logic needed)
 */

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});
const LoginScreen = ({ route, navigation }: LoginScreenProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneNumberLogin, setIsPhoneNumberLogin] = useState(false);
  const handlePasswordVisbilityToggle = () => setShowPassword(!showPassword);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const handleCountrySelect = (dialingCountryCode: string) => {
    setSelectedCountryCode(dialingCountryCode);
  };
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Cellular.requestPermissionsAsync();
  //     if (status === "granted") {
  //       const code = await Cellular.getMobileCountryCodeAsync();
  //       if (code) {
  //         setSelectedCountryCode(code);
  //       }
  //     }
  //   })();
  // }, []);
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {},
    });
    console.log(data);
  };
  //1234j7
  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
        <Heading fontWeight={"light"} mb="10">
          Login
        </Heading>
        {isPhoneNumberLogin ? (
          <>
            {/* <Button onPress={onOpen}>Actionsheet</Button> */}
            <HStack alignItems={"flex-end"}>
              <Button
                size={"sm"}
                _text={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "md",
                }}
                _pressed={{
                  bgColor: "white",
                }}
                variant="outline"
                borderWidth={"0"}
                borderBottomWidth={"1"}
                onPress={onOpen}
              >
                {selectedCountryCode}
              </Button>

              <FormControl
                isRequired
                _text={{
                  color: "darkBlue.400",
                }}
              >
                <Stack mx="4">
                  <FormControl.Label
                    _text={{
                      color: "darkBlue.400",
                    }}
                    _astrick={{
                      display: "none",
                    }}
                  >
                    Phone Number
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
                    defaultValue="12345"
                    placeholder=""
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Atleast 6 characters are required.
                  </FormControl.ErrorMessage>
                </Stack>
              </FormControl>
            </HStack>
            <Actionsheet
              overflow={"scroll"}
              isOpen={isOpen}
              onClose={onClose}
              size="full"
            >
              <Actionsheet.Content>
                <Box w="100%" h={60} px={4} justifyContent="center">
                  <Text
                    fontSize="16"
                    color="gray.500"
                    _dark={{
                      color: "gray.300",
                    }}
                  >
                    Albums
                  </Text>
                </Box>
                {/*  <Actionsheet.Item
                  startIcon={<Icon as={MaterialIcons} size="6" name="delete" />}
                >
                  Delete
                </Actionsheet.Item> */}
                <></>
                {countries.map((country) => {
                  return (
                    <Actionsheet.Item
                      onPress={() => handleCountrySelect(country.dialling_code)}
                      key={country.isoCode}
                    >
                      {country.name}
                    </Actionsheet.Item>
                  );
                })}
              </Actionsheet.Content>
            </Actionsheet>
          </>
        ) : (
          <FormControl
            isInvalid={Boolean(errors.email)}
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
                UserName or Email
              </FormControl.Label>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    autoCapitalize="none"
                    fontWeight={"bold"}
                    type="text"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
                )}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email?.message}
              </FormControl.ErrorMessage>
            </Stack>
          </FormControl>
        )}

        <FormControl isInvalid={Boolean(errors.password)}>
          <Stack mx="4">
            <FormControl.Label
              _text={{
                color: "darkBlue.400",
              }}
            >
              Password
            </FormControl.Label>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  fontWeight={"bold"}
                  _focus={{
                    bg: "white",
                    borderColor: "black",
                  }}
                  borderTopWidth={"0"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  fontSize={"md"}
                  InputRightElement={
                    <IconButton
                      _icon={{
                        color: "black",
                      }}
                      _pressed={{
                        bgColor: "white",
                      }}
                      icon={
                        showPassword ? (
                          <Icon as={Entypo} name="eye" />
                        ) : (
                          <Icon as={Entypo} name="eye-with-line" />
                        )
                      }
                      onPress={handlePasswordVisbilityToggle}
                    />
                  }
                  borderLeftWidth={"0"}
                  borderRightWidth={"0"}
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                />
              )}
              name="password"
            />

            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.password?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>

        <Button
          _text={{
            color: "darkBlue.400",
          }}
          variant={"link"}
        >
          Forgot Password?
        </Button>
      </Center>
      <Box>
        <Button
          onPress={onSubmit}
          _text={{
            my: "1.5",
          }}
          _pressed={{
            bg: "darkBlue.200",
          }}
          shadow="2"
          backgroundColor="darkBlue.400"
          borderRadius={"3xl"}
          _disabled={{
            _text: {
              color: "black",
            },
            bg: "darkBlue.100",
          }}
          mx="10"
          mb="5"
        >
          Login
        </Button>
        <GoogleSigninButton onPress={handleGoogleLogin}>
          Google Signin
        </GoogleSigninButton>
      </Box>
    </VStack>
  );
};

export default LoginScreen;
