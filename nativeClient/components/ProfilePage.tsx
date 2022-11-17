import { Button, ThemeConsumer, useTheme } from "@rneui/themed";
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
  const { theme, updateTheme } = useTheme();

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
        <Button title="Logout" type="solid" onPress={() => logout()} />
        <Text>You have no songs in your list!</Text>
      </>
    );
  if (data.getUserSongs.songs.length == 0)
    return (
      <>
        <Button
          buttonStyle={{
            backgroundColor: theme.colors.secondary,
            width: "30%",
            marginLeft: "auto",
          }}
          title="Logout"
          type="solid"
          onPress={() => logout()}
        />
        <Text style={{ textAlign: "center", marginTop: "50%", fontSize: 24 }}>
          You have no songs in your list!
        </Text>
      </>
    );

  return (
    <>
      <Button
        buttonStyle={{
          backgroundColor: theme.colors.secondary,
          width: "30%",
          marginLeft: "auto",
        }}
        title="Logout"
        type="solid"
        onPress={() => logout()}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "600",
          padding: 10,
        }}
      >
        My songlist
      </Text>
      {data.getUserSongs.songs.map((song) => (
        //View is here only to make sorting dropdown appear above the DropDownCards
        <View style={{ zIndex: -1 }} key={song._id}>
          <DropDownCard {...song} />
        </View>
      ))}
    </>
  );
}

export default ProfilePage;
