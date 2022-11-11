import { useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { ListItem, useTheme, Input, LinearProgress } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons'; 

import { songQueryVars } from '../GraphQL/cache';
import { GET_SONGS } from '../GraphQL/Queries';
import { RootTabScreenProps } from '../types';
import { getSongsInputs, songsDataType } from '../types/songData';
import { ScrollView, Text, View } from 'react-native';
import { color } from '@rneui/base';


export default function TabOneScreen( { navigation }: RootTabScreenProps<'TabOne'>) {
  const songVars = useReactiveVar(songQueryVars);
  const { theme, updateTheme } = useTheme()

  const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
    variables: songVars,
  });
 
  if (error) return <Text style={styles.title}>There was an error. Is the backend running?</Text>
  if (!data) return <View style={{backgroundColor: theme.colors.primary, height: '100%'}}><Text style={[styles.title, {color: theme.colors.white}]}>Loading...</Text><LinearProgress style={{ marginVertical: 10 }} /></View>
  return (
    <ScrollView style={{backgroundColor: theme.colors.primary}}>
      <Input
      placeholder='Search'
      returnKeyType='search'
      onSubmitEditing={(e)=> songQueryVars({...songVars, search: e.nativeEvent.text})}
      leftIcon={<Ionicons name="md-search-outline" size={24} color={"white"} />}
      style={{
        color: theme.colors.background,
        backgroundColor: theme.colors.grey0,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        paddingVertical: 10,
      }}
      />

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
