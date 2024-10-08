import { View, Text, LogBox } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import NavBar from "../components/NavBar";
import { useState } from "react";

LogBox.ignoreLogs([
  "Warning: TRenderEngineProvider",
  "Warning: MemoizedTNodeRenderer",
  "Warning: TNodeChildrenRenderer",
]);
const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("session user : ", session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        router.replace("/home");
        setLoggedIn(true);
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {loggedIn && <NavBar />}
    </>
  );
};

export default _layout;
