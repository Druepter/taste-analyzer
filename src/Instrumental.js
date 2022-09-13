import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import instrumentalImage from "./assets/instrumental_mittel.jpg"

export default function Instrumental({instrumentalTracks, createPlaylist}){

    return (
        <>
          <Container sx={{boxShadow: 1}} style={{backgroundColor: "white"}} maxWidth="md">

          <CategoryPageHeader
            title='Instrumentale Songs'
            image={instrumentalImage}
            description='Songs nur aus Instrumenten'>         
          </CategoryPageHeader>
          <TrackList tracks={instrumentalTracks}></TrackList>


          <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Instrumentale Songs" tracks={instrumentalTracks}></ButtonCreatePlaylist>


          </Container>
        </>
    )}