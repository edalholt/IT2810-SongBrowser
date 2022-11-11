import { ListItem } from "@rneui/themed";
import { useState } from "react";
import { songType } from "../types/songData";

export default function DropDownCard(song: songType) {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>{song.name}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{song.artists}</ListItem.Title>
          <ListItem.Subtitle>{song.year}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}
