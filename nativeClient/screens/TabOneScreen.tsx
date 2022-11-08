import { useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, ScrollView } from '../components/Themed';
import { songQueryVars } from '../GraphQL/cache';
import { GET_SONGS } from '../GraphQL/Queries';
import { RootTabScreenProps } from '../types';
import { getSongsInputs, songsDataType } from '../types/songData';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const songVars = useReactiveVar(songQueryVars);


  const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
    variables: songVars,
  });
 
  if (error) return <Text style={styles.title}>There was an error. Is the backend running?</Text>
  if (!data) return <Text style={styles.title}>Loading...</Text>
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Zaaap</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {data.getSongs.songs.map(((song) => (
      <Text key={song._id} style={styles.title}>{song.name}</Text>
      )))}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ScrollView>
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
