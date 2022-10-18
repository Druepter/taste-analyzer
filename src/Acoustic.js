import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import acousticImage from "./assets/akustik_mittel.jpg"

export default function Acosutic({acousticTracks, createPlaylist, renderState}){

    useEffect(() => {
      window.scrollTo(0, 0);
      renderState('acoustic')
    }, [])
    
    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">

            <CategoryPageHeader
              title='Akustische Songs'
              image={acousticImage}
              description='Organische Klänge'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={acousticTracks}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Akustische Songs" description="Organische Klänge" tracks={acousticTracks}></ButtonCreatePlaylist>
            </Container>
            
          </Container>
        </>
    )}