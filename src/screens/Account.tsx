import Loading from "components/atoms/Loading";
import supabase from "config/supabase";
import { Center, Button } from "native-base";
import { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
enum SignOutStatus {
  proccessing = 0,
  success = 1,
  fail = 2,
}
const AccountScreen = () => {
  const [isSigningOut, setIsSigningOut] = useState<SignOutStatus>();
  const handleLogout = async () => {
    setIsSigningOut(SignOutStatus.proccessing);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      setIsSigningOut(SignOutStatus.fail);
    } else {
      setIsSigningOut(SignOutStatus.success);
    }
  };
  if (SignOutStatus.proccessing) {
    return <Loading />;
  }
  return (
    <Center flex={1} padding="0">
      <Button
        onPress={handleLogout}
        variant={"text"}
        _text={{
          color: "#ff0000",
        }}
      >
        Log out
      </Button>
    </Center>
  );
};
export default AccountScreen;
