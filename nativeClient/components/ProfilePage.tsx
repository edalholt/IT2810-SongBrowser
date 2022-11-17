import { Button } from "@rneui/themed";
import React from "react";
import { Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isLoggedIn, songQueryVars } from "../GraphQL/cache";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_USER_SONGS } from "../GraphQL/Queries";
import { userSongsDataType } from "../types/songData";
import DropDownCard from "./DropDownCard";

function ProfilePage() {
  const songVars = useReactiveVar(songQueryVars);

  const { loading, error, data } = useQuery<userSongsDataType>(GET_USER_SONGS, {
    variables: { uid: songVars.uid },
  });
  const logout = () => {
    SecureStore.deleteItemAsync("token");
    isLoggedIn(false);
    songQueryVars({ ...songVars, uid: null });
  };
  if (!data)
    return (
      <>
        <Text>You have no songs in your list!</Text>
        <Button title="Logout" type="solid" onPress={() => logout()} />
      </>
    );

  return (
    <>
      {data.getUserSongs.songs.map((song) => {
        <View>
          <Text>{song.name}</Text>
        </View>;
      })}

      <Button title="Logout" type="solid" onPress={() => logout()} />
    </>
  );
}

export default ProfilePage;
