import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import liveImage from "./assets/live_mittel.jpg"

export default function Live({liveTracks, createPlaylist, renderState}){

    useEffect(() => {
      console.log(liveTracks)
      window.scrollTo(0, 0);
      renderState('live')
    }, [])

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">
         
            <CategoryPageHeader
              title='Live Songs'
              image={liveImage}
              description='Gefühle wie auf einem Konzert'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={liveTracks}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Live Songs" description="Gefühle wie auf einem Konzert" tracks={liveTracks}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}