import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import discoImageSmall from "./assets/disco_klein.png"
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import traurigImage from "./assets/traurig.jpg"

export default function LowValence({tracksWithLowValence, createPlaylist}){

    return (
        <>
          <Container sx={{boxShadow: 1}} style={{backgroundColor: "white"}} maxWidth="md">

          <CategoryPageHeader
            title='Traurige Songs'
            image={traurigImage}
            description='Auch traurige Songs gehören zu deinem Repertoire'>         
          </CategoryPageHeader>
          <TrackList tracks={tracksWithLowValence}></TrackList>


          <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Traurige Songs" tracks={tracksWithLowValence}></ButtonCreatePlaylist>


          </Container>
        </>
    )}