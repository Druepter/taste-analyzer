import React, { useState, useEffect} from "react";
import TrackList from "./TrackList";
import CategoryPageHeader from "./CategoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./ButtonCreatePlaylist";
import lowValenceImage from "./assets/traurig_mittel.jpg"

export default function LowValence({tracksWithLowValence, createPlaylist, renderState}){

    useEffect(() => {
      window.scrollTo(0, 0);
      renderState('lowValence')
    }, [])  

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">

            <CategoryPageHeader
              title='Traurige Songs'
              image={lowValenceImage}
              description='Alles wird gut'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={tracksWithLowValence}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Traurige Songs" description="Alles wird gut" tracks={tracksWithLowValence}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}