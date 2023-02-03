import * as React from "react";
import { Button } from "native-base";
import GoogleSvg from "../../atoms/Svg/GoogleSvg";
import { GestureResponderEvent } from "react-native";
const GoogleSigninButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => null | undefined;
}) => (
  <Button
    onPress={onPress}
    shadow={"2"}
    _pressed={{
      bg: "gray.100",
    }}
    bg={"white"}
    borderRadius={"3xl"}
    _disabled={{
      _text: {
        color: "black",
      },
      bg: "darkBlue.100",
    }}
    mx="10"
    mb="5"
    leftIcon={<GoogleSvg />}
    _text={{
      color: "gray.400",
    }}
  >
    Sign in with Google
  </Button>
);
export default GoogleSigninButton;
