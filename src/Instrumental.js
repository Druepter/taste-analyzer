import React, { useState, useEffect} from "react";
import TrackList from "./TrackList";
import CategoryPageHeader from "./CategoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./ButtonCreatePlaylist";
import instrumentalImage from "./assets/instrumental_mittel.jpg"

export default function Instrumental({instrumentalTracks, createPlaylist, renderState}){

    useEffect(() => {
      window.scrollTo(0, 0);
      renderState('instrumental')
    }, [])

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">
         
            <CategoryPageHeader
              title='Instrumentale Songs'
              image={instrumentalImage}
              description='Alles im Zeichen der Instrumente'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={instrumentalTracks}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Instrumentale Songs" description="Alles im Zeichen der Instrumente" tracks={instrumentalTracks}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}