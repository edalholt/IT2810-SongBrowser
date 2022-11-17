import { Button } from "@rneui/themed";
import React from "react";
import { Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isLoggedIn, songQueryVars } from "../GraphQL/cache";
import { useReactiveVar } from "@apollo/client";

function ProfilePage() {
  const songVars = useReactiveVar(songQueryVars);
  const logout = () => {
    SecureStore.deleteItemAsync("token");
    isLoggedIn(false);
    songQueryVars({ ...songVars, uid: null });
  };

  return (
    <>
      <Text>profilePage</Text>
      <Button title="Logout" type="solid" onPress={() => logout()} />
    </>
  );
}

export default ProfilePage;
