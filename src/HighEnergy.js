import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import highEnergyImage from "./assets/energetisch_mittel.jpg"

export default function HighEnergy({tracksWithHighEnergy, createPlaylist, renderState}){

    useEffect(() => {
      window.scrollTo(0, 0);
      renderState('highEnergy')
    }, [])

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">
         
            <CategoryPageHeader
              title='Engergetische Songs'
              image={highEnergyImage}
              description='Viel Energie'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={tracksWithHighEnergy}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Engergetische Songs" tracks={tracksWithHighEnergy}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}