import { useReactiveVar } from "@apollo/client";
import { StyleSheet } from "react-native";
import { useTheme, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { songQueryVars } from "../GraphQL/cache";
import { ScrollView } from "react-native";
import CardsContainer from "../components/cardsContainer";
import PageControl from "../components/PageControl";

export default function TabOneScreen() {
  const songVars = useReactiveVar(songQueryVars);
  const { theme, updateTheme } = useTheme();

  return (
    <ScrollView
      style={{backgroundColor: theme.colors.primary}}>
      <Input
        placeholder="Search"
        returnKeyType="search"
        onSubmitEditing={(e) =>
          songQueryVars({ ...songVars, search: e.nativeEvent.text, page: 1 })
        }
        leftIcon={
          <Ionicons name="md-search-outline" size={24} color={"white"} />
        }
        style={{
          color: theme.colors.background,
          backgroundColor: theme.colors.grey0,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 10,
          padding: 10,
          margin: 10,
          paddingVertical: 10,
        }}
      />
    <CardsContainer/>
    <PageControl/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
    backgroundColor: "yellow",
  },
});
