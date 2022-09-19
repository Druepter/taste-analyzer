import React, { useState, useEffect} from "react";
import TrackList from "./TrackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import danceableImageSmall from "./assets/tanzbar_klein.jpg"
import ButtonCreatePlaylist from "./buttonCreatePlaylist";


export default function Danceable({danceableTracks, createPlaylist, renderState}){

    useEffect(() => {
      window.scrollTo(0, 0);
      renderState('danceable')
    }, [])

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">
              <CategoryPageHeader
                title='Deine Tanzbaren Songs'
                image={danceableImageSmall}
                description='Rauf auf die Tanzfläche'>         
              </CategoryPageHeader>
          
            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={danceableTracks}></TrackList>
              
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Tanzbare Songs" description="Rauf auf die Tanzfläche" tracks={danceableTracks}></ButtonCreatePlaylist>

            </Container>
          </Container>
        </>
    )}