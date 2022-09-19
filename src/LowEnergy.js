import React, { useState, useEffect} from "react";
import TrackList from "./TrackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import lowEnergyImage from "./assets/ruhig_mittel.jpg"

export default function LowEnergy({tracksWithLowEnergy, createPlaylist, renderState}){

    useEffect(() => {
      window.scrollTo(0, 0);
      renderState('lowEnergy')
    }, [])

    return (
        <>
          <Container sx={{boxShadow: 1}} style={{backgroundColor: "white", padding: 0}} maxWidth="md">
         
            <CategoryPageHeader
              title='Ruhige Songs'
              image={lowEnergyImage}
              description='Für entspannte Momente'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={tracksWithLowEnergy}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Ruhige Songs" description="Für entspannte Momente" tracks={tracksWithLowEnergy}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}