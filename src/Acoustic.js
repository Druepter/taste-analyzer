import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import acousticImage from "./assets/akustik_mittel.jpg"

export default function Acosutic({acousticTracks, createPlaylist}){

    return (
        <>
          <Container sx={{boxShadow: 1}} style={{backgroundColor: "white"}} maxWidth="md">

          <CategoryPageHeader
            title='Akustische Songs'
            image={acousticImage}
            description='Organische Instrumente'>         
          </CategoryPageHeader>
          <TrackList tracks={acousticTracks}></TrackList>


          <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Akustische Songs" tracks={acousticTracks}></ButtonCreatePlaylist>


          </Container>
        </>
    )}