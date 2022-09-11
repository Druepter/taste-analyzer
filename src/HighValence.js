import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import traurigImage from "./assets/traurig.jpg"

export default function HighValence({tracksWithHighValence, createPlaylist}){

    return (
        <>
          <Container sx={{boxShadow: 1}} style={{backgroundColor: "white"}} maxWidth="md">

          <CategoryPageHeader
            title='Fröhliche Songs'
            image={traurigImage}
            description='Positive Energie'>         
          </CategoryPageHeader>
          <TrackList tracks={tracksWithHighValence}></TrackList>


          <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Fröhliche Songs" tracks={tracksWithHighValence}></ButtonCreatePlaylist>


          </Container>
        </>
    )}