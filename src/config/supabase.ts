import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import * as AsyncStorage from "@react-native-async-storage/async-storage";
const supabaseUrl = "https://kfkaqapdalsvflvezgda.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtma2FxYXBkYWxzdmZsdmV6Z2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NDU3MTUsImV4cCI6MTk5MDQyMTcxNX0.UWuaRAYvdzThgJGS-AXanwqPX-p_D3SYTNB5lDTMINA";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { detectSessionInUrl: false, storage: AsyncStorage.default },
});
export default supabase;
