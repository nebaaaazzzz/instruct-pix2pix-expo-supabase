import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Stack,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpStep3Props } from "navigation/type";
import supabase from "config/supabase";
/**
 *
 * TODO
 *  -add phone sign up (base structure added only some logic needed)
 */

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
const Step3 = ({ route, navigation }: SignUpStep3Props) => {
  const { firstName, lastName, date: dob } = route.params;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const authReponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          dob,
          firstName,
          lastName,
        },
      },
    });
    console.log(authReponse);
  };
  //1234j7
  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
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
              Email
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
                  borderLeftWidth={"0"}
                  borderRightWidth={"0"}
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
        <FormControl isInvalid={Boolean(errors.confirmPassword)}>
          <Stack mx="4">
            <FormControl.Label
              _text={{
                color: "darkBlue.400",
              }}
            >
              Confirm Password
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
                  borderLeftWidth={"0"}
                  borderRightWidth={"0"}
                  placeholder=""
                />
              )}
              name="confirmPassword"
            />

            <FormControl.HelperText>
              must match the password
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.confirmPassword?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Center>
      <Box>
        <Button
          onPress={handleSubmit(onSubmit)}
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
          mt="10"
          mx="10"
          mb="5"
        >
          SignUp
        </Button>
      </Box>
    </VStack>
  );
};

export default Step3;
