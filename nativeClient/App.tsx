import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider, Button, createTheme } from '@rneui/themed';
import { useColorScheme } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: 'http://it2810-67.idi.ntnu.no:4000/graphql',
    cache: new InMemoryCache()
  });

  const theme = createTheme({
    lightColors: {
      primary: '#52796f',
      white: '#FFD523', 
    },
    darkColors: {
      background: '#2C2E43',
      primary: '#2C2E43',
      white: '#FFD523',
    },
    mode: colorScheme || "dark",
  });
  console.log(theme.mode)
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
        <Navigation colorScheme={colorScheme}/>
        <StatusBar />
        </ApolloProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
