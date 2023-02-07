import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../config/supabase";
const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    (async () => {
      setSession(await (await supabase.auth.getSession())?.data?.session);
      setIsLoading(false);
    })();
  }, []);
  supabase.auth.onAuthStateChange(async (event, sessionCb) => {
    if (event == "SIGNED_IN" || event == "TOKEN_REFRESHED") {
      setSession(sessionCb);
    }
    if (event == "USER_DELETED" || event == "SIGNED_OUT") {
      setSession(null);
    }
  });
  return {
    isLoading,
    session,
  };
};
export default useAuth;
