import { useReactiveVar } from "@apollo/client";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import { songQueryVars } from "../GraphQL/cache";
import { SortBy, SortTypes } from "../enums/order";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function SortSongs() {
  const [selected, setSelected] = React.useState("");
  const [expanded, setExpanded] = useState(false);
  const songVars = useReactiveVar(songQueryVars);
  const { theme, updateTheme } = useTheme();
  const [sort, setSort] = useState<SortTypes>(SortTypes.desc);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.year);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    //Using reactive variables in apollo to refetch with new queries if sort order or parameter is changed.
    songQueryVars({ ...songVars, page: 1, orderBy: { [sortBy]: sort } });
    // Close open info when filtering
    // Eslint thinks useEffect should re-render when reactive variable changes.
    // This will cause a loop/wrong behavior, we therefore remove this rule.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sortBy]);

  const [visible, setVisible] = useState(false);

  const toggleSort = () => {
    if (sort == "asc") {
      setSort(SortTypes.desc);
      setAsc(true);
    } else {
      setSort(SortTypes.asc);
      setAsc(false);
    }
  };

  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const renderDropdown = () => {
    if (visible) {
      return (
        <View>
          <TouchableOpacity onPress={toggleSort}>
            {asc ? (
              <Text style={styles.order}>
                Desc &nbsp;
                <MaterialCommunityIcons
                  name="sort-descending"
                  size={20}
                  color="white"
                />
              </Text>
            ) : (
              <Text style={styles.order}>
                Asc &nbsp; &nbsp;
                <MaterialCommunityIcons
                  name="sort-ascending"
                  size={20}
                  color="white"
                />
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy(SortBy.danceability)}>
            <Text style={styles.dropText}>Danceability</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy(SortBy.duration_ms)}>
            <Text style={styles.dropText}>Duration</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortBy(SortBy.popularity)}>
            <Text style={styles.dropText}>Popularity</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        {visible ? (
          <AntDesign name="up" size={24} color={theme.colors.white} />
        ) : (
          <AntDesign name="down" size={24} color="white" />
        )}
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          width: 100,
          height: "auto",
          top: 40,
          right: 0,
          zIndex: 1,
          backgroundColor: theme.colors.grey0,
        }}
      >
        {renderDropdown()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropText: {
    margin: 10,
    color: "white",
  },
  order: {
    margin: 10,
    color: "white",
  },
});
