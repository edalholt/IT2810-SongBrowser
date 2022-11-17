import { Chip, ListItem, ThemeConsumer } from "@rneui/themed";
import React, { useState } from "react";
import { useTheme } from "@rneui/themed";
import { songType } from "../types/songData";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function DropDownCard(song: songType) {
  const [expanded, setExpanded] = useState(false);
  const { theme, updateTheme } = useTheme();

  //midlertidig, skal erstattes med logikk for å legge til i Liked listen
  const [added, setAdded] = useState(false);

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
          {added ? (
            <ListItem.Content style={styles.AddToList}>
              <ListItem.Title>Remove from list</ListItem.Title>
              <MaterialIcons
                name="playlist-add-check"
                size={28}
                color={theme.colors.success}
                //midlertidig, skal erstattes med logikk for å legge til i Liked listen
                onPress={(e) => setAdded(!added)}
              />
            </ListItem.Content>
          ) : (
            <ListItem.Content style={styles.AddToList}>
              <ListItem.Title>Add to list</ListItem.Title>
              <MaterialIcons
                name="playlist-add"
                size={28}
                color={theme.colors.black}
                //midlertidig, skal erstattes med logikk for å legge til i Liked listen
                onPress={(e) => setAdded(!added)}
              />
            </ListItem.Content>
          )}
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}
