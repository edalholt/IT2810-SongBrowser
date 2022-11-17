import { Chip, ListItem, ThemeConsumer } from "@rneui/themed";
import React, { useState } from "react";
import { useTheme } from "@rneui/themed";
import { songType } from "../types/songData";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavProps } from "../types/navigationTypes";
import { useMutation, useReactiveVar } from "@apollo/client";
import { TOGGLE_SONGLIST } from "../GraphQL/Mutations";
import { songQueryVars } from "../GraphQL/cache";
import { GET_SONGS, GET_USER_SONGS } from "../GraphQL/Queries";

export default function DropDownCard(song: songType) {
  const [expanded, setExpanded] = useState(false);
  const { theme, updateTheme } = useTheme();
  const navigation = useNavigation<LoginScreenNavProps>();
  const [toggleSong] = useMutation(TOGGLE_SONGLIST);
  const queryvar = useReactiveVar(songQueryVars);

  const styles = StyleSheet.create({
    content: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "space-between",
      color: theme.colors.black,
    },
    AddToList: {
      display: "flex",
      alignItems: "flex-end",
    },
  });
  return (
    <ListItem.Accordion
      containerStyle={{
        backgroundColor: theme.colors.grey1,
        borderTopColor: theme.colors.primary,
        borderTopWidth: 1,
      }}
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>{song.name}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <ListItem containerStyle={{ backgroundColor: theme.colors.grey1 }}>
        <ListItem.Content style={styles.content}>
          <ListItem.Title style={{ flexBasis: "100%" }}>
            Artist:
            {"\n"}
            {song.artists.map((e) => {
              return e + "\n";
            })}{" "}
          </ListItem.Title>

          <ListItem.Title style={{ flexBasis: "51%" }}>
            Danceability: {song.danceability.toFixed(4)}
          </ListItem.Title>
          <ListItem.Title style={{ flexBasis: "51%" }}>
            Duration: {song.duration_ms * 0.001}s
          </ListItem.Title>
          <ListItem.Title style={{ flexBasis: "51%" }}>
            Released: {song.year}
          </ListItem.Title>
          {song.isLiked ? (
            <ListItem.Content style={styles.AddToList}>
              <ListItem.Title>Remove from list</ListItem.Title>
              <MaterialIcons
                name="playlist-add-check"
                size={28}
                color={theme.colors.success}
                //midlertidig, skal erstattes med logikk for å legge til i Liked listen
                onPress={() => {
                  toggleSong({
                    variables: { uid: queryvar.uid, songID: song._id },
                    refetchQueries: [GET_SONGS, GET_USER_SONGS],
                  });
                }}
              />
            </ListItem.Content>
          ) : song.isLiked != null ? (
            <ListItem.Content style={styles.AddToList}>
              <ListItem.Title>Add to list</ListItem.Title>

              <MaterialIcons
                name="playlist-add"
                size={28}
                color={theme.colors.black}
                //midlertidig, skal erstattes med logikk for å legge til i Liked listen
                onPress={() =>
                  toggleSong({
                    variables: { uid: queryvar.uid, songID: song._id },
                    refetchQueries: [GET_SONGS, GET_USER_SONGS],
                  })
                }
              />
            </ListItem.Content>
          ) : (
            <ListItem.Subtitle onPress={() => navigation.navigate("Profile")}>
              Log in to save this song
            </ListItem.Subtitle>
          )}
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}
