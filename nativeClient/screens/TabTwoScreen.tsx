import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { useTheme } from '@rneui/themed';

export default function TabTwoScreen() {
  const { theme, updateTheme } = useTheme()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={[styles.separator, {backgroundColor: theme.colors.primary}]} />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
