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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
const Step2 = () => {
  const [birthDate, setBirthDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChangeDate = (event: DateTimePickerEvent, timeStamp: Date) => {
    if (event.type == "set") {
      setBirthDate(new Date(timeStamp));
    }
    setShowDatePicker(false);
  };
  return (
    <VStack flex={1} bgColor="white" justifyContent={"space-between"}>
      <Box></Box>
      <Center px="1/6">
        <Heading fontWeight={"light"} mb="10">
          When's your birthday?
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
              Birth Date
            </FormControl.Label>

            <Input
              onPressOut={() => setShowDatePicker(true)}
              fontWeight={"bold"}
              type="text"
              readOnly
              value={birthDate ? birthDate.toDateString() : ""}
              bgColor={"white"}
              borderColor="black"
              placeholder="select your birth date"
              fontSize={"md"}
              borderTopWidth={"0"}
              borderLeftWidth={"0"}
              borderRightWidth={"0"}
            />
          </Stack>
        </FormControl>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            display="spinner"
            onChange={handleChangeDate}
          />
        )}
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

export default Step2;
