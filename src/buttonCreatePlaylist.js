import Box from "@mui/material/Box";
import Button from '@mui/material/Button';


export default function ButtonCreatePlaylist({createPlaylist, tracks, title, description}){

    const handleCreatePlaylistClick = () =>{
        createPlaylist(title, tracks, description)
      }

    return(
        <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 4, paddingBottom: 5}}
            >
              <Button onClick={handleCreatePlaylistClick} variant="contained" size="large">Erstelle Playlist</Button>
            </Box>
        </>
    )
}