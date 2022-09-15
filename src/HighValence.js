import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import highValenceImage from "./assets/gluecklich_mittel.jpg"

export default function HighValence({tracksWithHighValence, createPlaylist}){

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">

            <CategoryPageHeader
              title='Fröhliche Songs'
              image={highValenceImage}
              description='Positive Energie'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={tracksWithHighValence}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Fröhliche Songs" tracks={tracksWithHighValence}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}