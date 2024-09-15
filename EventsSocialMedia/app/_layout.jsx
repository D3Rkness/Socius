import { View, Text, LogBox } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import NavBar from "../components/NavBar";

LogBox.ignoreLogs([
  "Warning: TRenderEngineProvider",
  "Warning: MemoizedTNodeRenderer",
  "Warning: TNodeChildrenRenderer",
]);
const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
      <NavBar />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();
  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    if (res.success) {
      setUserData({ ...res.data, email });
    }
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session user : ", session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
