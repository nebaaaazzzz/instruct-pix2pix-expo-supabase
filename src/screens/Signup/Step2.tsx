import { Box, Button, Center, Heading, Stack, VStack } from "native-base";
import React, { createRef, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { TextInput } from "react-native";
import { SignUpStep2Props } from "src/navigation/type";
const Step2 = ({ route, navigation }: SignUpStep2Props) => {
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
  const inputRef = createRef<TextInput>();
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
        <Stack mx="4" position="relative">
          <Box
            onTouchStart={() => {
              setShowDatePicker(true);
            }}
            style={{
              width: "60%",
              height: 60,
            }}
            position="absolute"
          ></Box>
          <TextInput
            // fontWeight={"bold"}

            // type="text"
            // _focus={{
            //   bg: "white",
            //   borderColor: "black",
            // }}            backgroundColor: "red",

            // fontSize={"md"}
            // borderTopWidth={"0"}
            // borderLeftWidth={"0"}
            // borderRightWidth={"0"}
            style={{
              width: "100%",
              height: 60,
              borderBottomColor: "#fff",
              borderBottomWidth: 1,
            }}
            onFocus={() => {
              inputRef.current?.blur();
            }}
            // width={"2/3"}
            defaultValue=""
            onPressIn={() => {
              setShowDatePicker(true);
            }}
            onTouchStart={() => {
              setShowDatePicker(true);
            }}
            editable={false}
            // isReadOnly={true}
            value={birthDate ? birthDate.toDateString() : ""}
            // bgColor={"white"}
            // borderColor="black"
            placeholder="select your birth date"
          />
        </Stack>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            onChange={handleChangeDate}
          />
        )}
      </Center>
      <Button
        isDisabled={!birthDate}
        onPress={onSubmit}
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
