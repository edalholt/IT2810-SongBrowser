import { useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { ListItem, useTheme } from '@rneui/themed';

import { songQueryVars } from '../GraphQL/cache';
import { GET_SONGS } from '../GraphQL/Queries';
import { RootTabScreenProps } from '../types';
import { getSongsInputs, songsDataType } from '../types/songData';
import { ScrollView, Text, View } from 'react-native';


export default function TabOneScreen( { navigation }: RootTabScreenProps<'TabOne'>) {
  const songVars = useReactiveVar(songQueryVars);
  const { theme, updateTheme } = useTheme()

  const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
    variables: songVars,
  });
 
  if (error) return <Text style={styles.title}>There was an error. Is the backend running?</Text>
  if (!data) return <Text style={styles.title}>Loading...</Text>
  return (
    <ScrollView style={{backgroundColor: theme.colors.primary}}>
      {data.getSongs.songs.map(((song) => (
        <>
        <ListItem key={song._id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{song.name}</ListItem.Title>
            <ListItem.Subtitle>{song.year}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        </>
      )))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    backgroundColor: 'yellow'
  },
});
