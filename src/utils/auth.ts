import { makeRedirectUri, startAsync } from "expo-auth-session";
import supabase from "../config/supabase";

export const handleGoogleLogin = async () => {
  const redirectUrl = makeRedirectUri({
    path: "/auth/callback",
  });
  const supabaseUrl = "https://kfkaqapdalsvflvezgda.supabase.co/";
  const authResponse = await startAsync({
    authUrl: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
    returnUrl: redirectUrl,
  });
  if (authResponse.type == "success") {
    supabase.auth.setSession({
      access_token: authResponse.params.access_token,
      refresh_token: authResponse.params.refresh_token,
    });
  }
  //is AuthSession.dismiss called
  if (authResponse.type == "dismiss") {
  }
  //if user close the browser
  if (authResponse.type == "cancel") {
  }
  if (authResponse.type == "error") {
  }
  //morethan once startAsync called before other finished
  if (authResponse.type == "locked") {
  }
};
