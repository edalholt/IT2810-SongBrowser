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
    
    const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
        variables: songVars,
      });
    
      useEffect(() => {
        if(data){
          songTotalPages(data.getSongs.totalPages)
        }
      }, [data])
      
     
    if (error) return <Text style={styles.title}>There was an error. Is the backend running?</Text>
    if (!data) return <View style={{backgroundColor: theme.colors.primary, height: '100%'}}><Text style={[styles.title, {color: theme.colors.white}]}>Loading...</Text><LinearProgress style={{ marginVertical: 10 }} /></View>
    return (
        <>
        {data.getSongs.songs.map((song) => (
            <DropDownCard {...song} key={song._id} />
        ))}
        </>
    )
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