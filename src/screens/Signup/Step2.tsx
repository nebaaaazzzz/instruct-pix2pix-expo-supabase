import {
  Actionsheet,
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Stack,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React, { useState, useEffect } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpStep2Props } from "src/navigation/type";
const schema = yup.object({
  date: yup.date().required(),
});
const Step2 = ({ route, navigation }: SignUpStep2Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
    },
  });
  const [birthDate, setBirthDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChangeDate = (
    event: DateTimePickerEvent,
    timeStamp: Date | undefined
  ) => {
    if (event.type == "set" && timeStamp) {
      setBirthDate(new Date(timeStamp));
    }
    setShowDatePicker(false);
  };
  const onSubmit = ({ date }: { date: string }) => {
    navigation.navigate("signup/step3", {
      date,
      ...route.params,
    });
  };
  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
        <Heading fontWeight={"light"} mb="10">
          When's your birthday?
        </Heading>
        <FormControl
          isInvalid={Boolean(errors.date)}
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
              Birth Date
            </FormControl.Label>

            <Controller
              name="date"
              control={control}
              render={() => (
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
                  onPressOut={() => setShowDatePicker(true)}
                  isReadOnly={true}
                  value={birthDate ? birthDate.toDateString() : ""}
                  bgColor={"white"}
                  borderColor="black"
                  placeholder="select your birth date"
                />
              )}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.date?.message}
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={handleChangeDate}
          />
        )}
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
        Continue
      </Button>
    </VStack>
  );
};

export default Step2;
