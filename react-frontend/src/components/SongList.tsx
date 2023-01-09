import { useEffect } from "react";
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_SONGS } from "../GraphQL/Queries";
import { RATE_SONG } from "../GraphQL/Mutations";
import { Stack, Chip, Rating, Box, Grid, Table, TableCell, TableBody, TableContainer, TableRow, TableHead, Paper, Typography, Collapse, IconButton, LinearProgress } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { getSongsInputs, songsDataType } from "../types/songData";
import { openSongTab, songCurrentPage, songQueryVars, songTotalPages } from '../GraphQL/cache';

function SongList() {

    const songVars = useReactiveVar(songQueryVars);
    const open = useReactiveVar(openSongTab);

    // Prepare mutation and query, and do the initial fetch.
    const { loading, error, data } = useQuery<songsDataType, getSongsInputs>(GET_SONGS, {
      variables: songVars,
    });
    const [rateSong] = useMutation(RATE_SONG);
   
  
    useEffect(() => {
      if(data){
        songCurrentPage(data.getSongs.page)
        songTotalPages(data.getSongs.totalPages)
      }
    }, [data])
    
    
  if (loading) return <><LinearProgress sx={{m: 10}} /></>;
  if (error || !data) return <><Box style={{ minHeight: '80vh' }} display="flex" justifyContent={"center"} alignItems={"center"} ><Typography color={"white"} variant="h5">Something went wrong :/<br/>Is the backend server running?</Typography></Box></>;
  return (
    <>
    <Box>
    <Grid item xs={12} md={9}
      sx={{mx: 'auto', p: '15px'}}
      container
      direction="column"
      alignItems="center" 
      justifyContent="center"
    > 
      <TableContainer sx={{mx:"auto", backgroundColor: "tableRow"}} component={Paper}>
        <Table aria-label="songtable">
          <TableHead>
            <TableRow key="song-table-titles">
              <TableCell title="empty" key="empty"></TableCell>
              <TableCell key="name" >Name</TableCell>
              <TableCell key="main-artist">Main Artist</TableCell>
              <TableCell key="year">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getSongs.songs.map(((song, index: number) => (
              <>
              <TableRow key={song._id}>
                {/* Inspiration from this video: https://www.youtube.com/watch?v=3v2cxwvWh80&t=688s */}
                <TableCell>
                  <IconButton title="expand song info"
                    onClick={() => openSongTab(open === index ? -1 : index)} //Opens song tab if closed, closes the previous tab if new one is clicked
                  >
                    {open === index ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.artists[0]}</TableCell>
                <TableCell>{song.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{paddingBottom: 0, paddingTop: 0, border: "0px"}}>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <Box sx={{width: "auto", display: "flex", flexWrap: 'wrap', flexDirection: 'column'}}> 
                  
                  <Chip label="Info" color="primary" sx={{width: 100, mt: 2}}/>
                  <Stack mt={2} direction="row" flexWrap={"wrap"}>
                  <Chip sx={{mb: 2, mr: 2}} label={"Danceability: "+ (song.danceability * 100).toFixed()+"%"} variant="outlined" />
                  <Chip sx={{mb: 2, mr: 2}} label={"Popularity: "+ song.popularity + " / 100"} variant="outlined" />
                  <Chip sx={{mb: 2, mr: 2}} label={Math.floor(song.duration_ms / 60000) +" : "+ ((song.duration_ms % 60000) / 1000).toFixed(0) + " min"} variant="outlined" />
                  {(song.explicit) ? (<Chip label={"Explicit"} variant="outlined" />) : (null)}
                  </Stack>

                  <Chip label="Artists" color="primary" sx={{width: 100, mt: 2}}/>
                  <Stack mt={2} direction="row" flexWrap={"wrap"}>
                  {song.artists.map((artist: string, i:number) => (
                    <Chip key={i} label={artist} variant="outlined" sx={{mb: 2, mr: 2}}/>
                    ))}
                  </Stack>
              
                  <Stack mt={2} direction="column" spacing={2}>
                  <Typography sx={{color:"textColor"}} variant="subtitle2">Rate this song:</Typography>
                  <Rating
                      name="song-rating"
                      value={song.rating}
                      onChange={(event, newValue) => {rateSong({variables: {id: song._id, rating: newValue}})}}/>

                  </Stack>
                  </Box>
                  </Collapse>
                </TableCell>
                </TableRow>
                </>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
 
    </Grid>
    </Box>
    </>
  )
}

export default SongList