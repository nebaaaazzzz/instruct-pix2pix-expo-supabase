import type { StackScreenProps } from "@react-navigation/stack";
type RootStackParamList = {
  login: undefined;
  home: undefined;
  signup: undefined;
  initial: undefined;
};
type LoginScreenProps = StackScreenProps<RootStackParamList, "login">;
type SignupScreenProps = StackScreenProps<RootStackParamList, "signup">;
type InitialScreenProps = StackScreenProps<RootStackParamList, "initial">;

///////////signup
type step2Params = { firstName: string; lastName: string };
type step3Params = step2Params & { date: string };
type step4Params = step3Params & { userName: string };
type SignupStackParamList = {
  "signup/step1": undefined;
  "signup/step2": step2Params;
  "signup/step3": step3Params;
  "signup/step4": step4Params;
};
type SignUpStep1Props = StackScreenProps<SignupStackParamList, "signup/step1">;
type SignUpStep2Props = StackScreenProps<SignupStackParamList, "signup/step2">;
type SignUpStep3Props = StackScreenProps<SignupStackParamList, "signup/step3">;
type SignUpStep4Props = StackScreenProps<SignupStackParamList, "signup/step4">;

//home
type HomeBottomParamList = {
  roastbottomtab: undefined;
  camerabottomtab: undefined;
  chatbottomtab: undefined;
  storiesbottomtab: undefined;
};

export {
  RootStackParamList,
  LoginScreenProps,
  SignupScreenProps,
  InitialScreenProps,
  //signup
  SignupStackParamList,
  SignUpStep1Props,
  SignUpStep2Props,
  SignUpStep3Props,
  SignUpStep4Props,

  //home
  HomeBottomParamList,
};
