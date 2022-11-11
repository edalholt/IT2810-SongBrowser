import { useQuery, useReactiveVar } from '@apollo/client';
import { StyleSheet } from 'react-native';
import { ListItem, useTheme, Input, LinearProgress, ButtonGroup } from '@rneui/themed';
import { Feather, FontAwesome } from '@expo/vector-icons'; 

import { songQueryVars, songTotalPages } from '../GraphQL/cache';
import { GET_SONGS } from '../GraphQL/Queries';
import { RootTabScreenProps } from '../types';
import { getSongsInputs, songsDataType } from '../types/songData';
import { ScrollView, Text, View } from 'react-native';
import { Button, color } from '@rneui/base';
import { useEffect, useState } from 'react';


export default function PageControl() {
  const { theme, updateTheme } = useTheme()
  const [pageIndex, setPageIndex] = useState(1)
  const maxPage = useReactiveVar(songTotalPages);
  const songVars = useReactiveVar(songQueryVars);
  const firstPage = 1;
  const [selectIndex, setSelectIndex] = useState(0)
  const [buttons, setButtons] = useState([pageIndex, pageIndex +1, maxPage])

  useEffect(() => {
    setSelectIndex(0)
    handlePageChange(0)
  }, [maxPage])

  useEffect(() => {
    songQueryVars({...songVars, page: pageIndex})
  }, [pageIndex])
  
  
  const handlePageChange = (buttonValue: number) => {
    if (maxPage < 2) {
      setSelectIndex(0)
      setButtons([firstPage])
    }
    else if (maxPage < 3) {
      setSelectIndex(buttons[buttonValue]-1)
      setPageIndex(buttons[buttonValue])
      setButtons([firstPage, maxPage])
    }
    else if (buttons[buttonValue] == firstPage) {
      setSelectIndex(0)
      setPageIndex(buttons[buttonValue])
      setButtons([buttons[buttonValue], buttons[buttonValue] +1, maxPage])
    }
    else if (buttons[buttonValue] == maxPage) {
      setSelectIndex(2)
      setPageIndex(buttons[buttonValue])
      setButtons([firstPage, buttons[buttonValue]-1, buttons[buttonValue]])
    }
    else if (maxPage < 4 && pageIndex == 1 ){
      setSelectIndex(buttons[buttonValue]-1)
      setPageIndex(buttons[buttonValue])
      setButtons([firstPage, buttons[buttonValue], maxPage])
    }
    else if (buttons[buttonValue] == maxPage -1 && maxPage < 4) {
      setSelectIndex(buttons[buttonValue]-1)
      setPageIndex(buttons[buttonValue])
      setButtons([firstPage, buttons[buttonValue], maxPage])
    }
    else if (buttons[buttonValue] == maxPage -1) {
      setSelectIndex(2)
      setPageIndex(buttons[buttonValue])
      setButtons([firstPage, buttons[buttonValue]-1, buttons[buttonValue], maxPage])
    }
    else if (buttons[buttonValue] == 2) {
      setSelectIndex(1)
      setPageIndex(buttons[buttonValue])
      setButtons([buttons[buttonValue]-1, buttons[buttonValue], buttons[buttonValue] +1, maxPage])
    }
    else {
      setSelectIndex(2)
      setPageIndex(buttons[buttonValue])
      setButtons([firstPage, buttons[buttonValue]-1, buttons[buttonValue], buttons[buttonValue]+1, maxPage])
    }
  }

  return (
    <View>
        <ButtonGroup
      buttons={buttons.map((i) => (String(i)))}
      selectedIndex={selectIndex}
      onPress={(value) => {
        handlePageChange(value)
      }}
      containerStyle={{ marginBottom: 20 }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
});
