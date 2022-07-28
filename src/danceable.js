import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";


export default function Danceable({danceableTracks, createPlaylist}){

    const handleCreatePlaylistClick = () =>{
      createPlaylist("Tanzbare Songs", danceableTracks)
    }

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white"}} maxWidth="md">

            <CategoryPageHeader></CategoryPageHeader>
            <TrackList tracks={danceableTracks}></TrackList>
            

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 4, paddingBottom: 5}}
            >
              <Button onClick={handleCreatePlaylistClick} variant="contained" size="large">Erstelle Playlist</Button>
            </Box>

            {/*<Link to="/lowValence">Weiter zur Auswertung</Link>*/}

          </Container>
        </>
    )}