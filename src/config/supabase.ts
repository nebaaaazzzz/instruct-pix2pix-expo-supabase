import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import * as AsyncStorage from "@react-native-async-storage/async-storage";
const supabaseUrl = "https://kfkaqapdalsvflvezgda.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtma2FxYXBkYWxzdmZsdmV6Z2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NDU3MTUsImV4cCI6MTk5MDQyMTcxNX0.UWuaRAYvdzThgJGS-AXanwqPX-p_D3SYTNB5lDTMINA";
const storage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { detectSessionInUrl: false },
});

export default supabase;
