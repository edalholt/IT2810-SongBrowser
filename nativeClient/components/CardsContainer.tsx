import { useQuery, useReactiveVar } from "@apollo/client";
import { StyleSheet } from "react-native";
import { useTheme, LinearProgress } from "@rneui/themed";
import { songQueryVars, songTotalPages } from "../GraphQL/cache";
import { GET_SONGS } from "../GraphQL/Queries";
import { getSongsInputs, songsDataType } from "../types/songData";
import { Text, View } from "react-native";
import React, { useEffect } from "react";
import DropDownCard from "../components/DropDownCard";

export default function cardsContainer() {
  const { theme, updateTheme } = useTheme();
  const songVars = useReactiveVar(songQueryVars);

  // Fetching data with the GET_SONGS query, whith every variable in songVars.
  const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(
    GET_SONGS,
    {
      variables: songVars,
    }
  );

  // Updates total pages for a search whenever there is a new search.
  useEffect(() => {
    if (data) {
      songTotalPages(data.getSongs.totalPages);
    }
  }, [data]);

  // if an error occured, this will be displayed.
  if (error)
    return (
      <Text style={styles.title}>
        There was an error. Is the backend running?
      </Text>
    );

  // While the search has not been completed yet.
  if (!data)
    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          height: "100%",
          zIndex: -1,
        }}
      >
        <Text style={[styles.title, { color: theme.colors.white }]}>
          Loading...
        </Text>
        <LinearProgress
          style={{ marginVertical: 10 }}
          color={theme.colors.white}
        />
      </View>
    );

  // When everything is running smoothly, and all the desired data has been loaded.
  return (
    <>
      {/* Mapping over the search results creating a drop down card for each song. */}
      {data.getSongs.songs.map((song) => (
        //View is here to make sorting dropdown appear above the DropDownCards and give every DropDownCard a unique key.
        <View style={{ zIndex: -1 }} key={song._id}>
          <DropDownCard {...song} />
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
    backgroundColor: "yellow",
  },
});
