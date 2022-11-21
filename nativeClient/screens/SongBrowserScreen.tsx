import { useReactiveVar } from "@apollo/client";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme, Input } from "@rneui/themed";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { songQueryVars } from "../GraphQL/cache";
import { ScrollView } from "react-native";
import CardsContainer from "../components/CardsContainer";
import PageControl from "../components/PageControl";
import SortSongs from "../components/SortSongs";
import React, { useState } from "react";
import { color } from "@rneui/base";

export default function SongBrowserScreen() {
  // initializing states and getting the theme and a reactive variable.
  const songVars = useReactiveVar(songQueryVars);
  const { theme, updateTheme } = useTheme();
  const [activeBar, setActiveBar] = useState(false);
  const [iconColor, setIconColor] = useState("#FFFFFF");

  // Creates the seach bar for searching in the DB.
  return (
    <ScrollView style={{ backgroundColor: theme.colors.primary }}>
      <View
        style={{
          backgroundColor: theme.colors.grey1,
          borderColor: "transparent",
          borderRadius: 10,
          height: 60,
          marginVertical: "5%",
          marginHorizontal: "2%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="md-search-outline"
          size={28}
          color={iconColor}
          style={{ padding: 15 }}
        />
        <TextInput
          placeholder="Search"
          returnKeyType="search"
          placeholderTextColor={"#808080"}
          onSubmitEditing={(e) => {
            songQueryVars({ ...songVars, search: e.nativeEvent.text, page: 1 });
            setActiveBar(!activeBar);
          }}
          onFocus={() => setIconColor(theme.colors.white)}
          onBlur={() => setIconColor("#FFFFFF")}
          style={{
            color: theme.colors.black,
            backgroundColor: theme.colors.grey1,
            borderColor: "transparent",
            height: 60,
            flexBasis: "80%",
            borderRadius: 10,
            fontWeight: "600",
          }}
        ></TextInput>
        <View style={{ margin: -15 }}>
          <SortSongs />
        </View>
      </View>
      <CardsContainer />
      <PageControl />
    </ScrollView>
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
