import { useReactiveVar } from "@apollo/client";
import LoginScreen from "../components/LoginScreen";
import ProfilePage from "../components/ProfilePage";
import { isLoggedIn, songCurrentPage, songQueryVars } from "../GraphQL/cache";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationTypes";

export default function ProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Profile">) {
  const login = useReactiveVar(isLoggedIn);
  const songVars = useReactiveVar(songQueryVars);

  // Checks if a user is logged in and updates the reactive variable to true if user is logged in.
  const CheckLogin = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      isLoggedIn(true);
      songQueryVars({ ...songVars, uid: token });
    }
  };

  useEffect(() => {
    CheckLogin();
  }, []);

  // If the ractive variable says 'login' is true, the user is taken to the profile page, otherwise the user is taken to the Login screen.
  if (login) return <ProfilePage />;
  else return <LoginScreen />;
}
