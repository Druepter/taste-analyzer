import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import spotifyImage from './assets/spotify_zugeschnitten.jpg'
import Box from "@mui/material/Box";

//Mit dieser Funktion wird die Login Seite erstellt
//Als Parameter werden Eigenschaften entgegengenommen, welche für den Login mit Spotify benötigt werden
export default function Login({_AUTH_ENDPOINT, _CLIENT_ID, _REDIRECT_URI, _RESPONSE_TYPE, _scope}) {
  return (
    <>
      <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", paddingTop: 6}} maxWidth="md">

        {/* Header Bild */}
        <ImageList cols={1} sx={{marginLeft: "-24px", marginRight: "-24px", marginTop: "-10px"}}>
            <ImageListItem>
                <img
                    src={`${spotifyImage}?w=500&fit=crop&auto=format`}
                    srcSet={`${spotifyImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={'spotify'}
                    loading="loading"
                    sx={{marginLeft: "-30px"}}
                />
            </ImageListItem>                
        </ImageList>
        
        <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
            Spotify Taste Analyzer
        </Typography>
        <Typography sx={{mb: 2, mt: 3, fontSize: 15}}>
          <ul>
          <li>Du hast dich immer schoneimal gefragt was deinen Musikgeschmack am besten beschreibt?<br></br></li>
          <li>Du willst einen geordneten Überblick über deine Lieblingssongs und deren Eigenschaften?<br></br></li>
          <li>Du brauchst eine Playlist, bestehend aus deinen Top Tracks, für eine ganz bestimmte Stimmung?<br></br></li>
          </ul>
        </Typography>
        <Typography sx={{mb: 2, mt: 2, fontSize: 18, fontWeight: 550}}>
          Dann ist der Spotify Taste Analyzer das richtige für dich.
        </Typography>
        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
          <ul>    
            <li>Logge dich jetzt mit Spotify ein und lass dir dein individuelles Musikprofil berechnen!</li>
          </ul>
        </Typography>
        <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 3, paddingBottom: 5}}
            >
              {/* Button zum Login bei Spotify, als Query werden die Parameter der Funktion verwendet */}
              <Button variant="contained" href={`${_AUTH_ENDPOINT}?client_id=${_CLIENT_ID}&redirect_uri=${_REDIRECT_URI}&response_type=${_RESPONSE_TYPE}&scope=${_scope}`}>Mit Spotify einloggen</Button>
        </Box>             
      </Container>
    </>         
  )
}