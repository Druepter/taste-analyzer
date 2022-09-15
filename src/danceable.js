import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
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
                description='In deinen Lieblingssongs finden sich einige Lieder zu denen sich super das Tanzbein schwingen lässt:'>         
              </CategoryPageHeader>
          
            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={danceableTracks}></TrackList>
              

              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Tanzbare Songs" tracks={danceableTracks}></ButtonCreatePlaylist>

            </Container>
          </Container>
        </>
    )}