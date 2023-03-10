import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useColorScheme } from "react-native";
import Navigation from "./navigation";

export default function App() {
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  const theme = createTheme({
    // Color scheme for light mode
    lightColors: {
      primary: "#9394a5",
      white: "#FFD523",
      grey1: "#d2d3db",
      black: "black",
      grey5: "#393e42",
      error: "#bf2c24",
    },

    //  Color scheme for dark mode
    darkColors: {
      background: "#2C2E43",
      primary: "#2C2E43",
      white: "#FFD523",
      grey1: "#595260",
      black: "white",
      grey5: "#393e42",
      error: "#bf2c24",
    },

    // Uses the users system settings to decide for dark or light mode. If it cant find any, it uses dark mode ??
    mode: colorScheme || "dark",
  });

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Navigation />
          <StatusBar />
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
