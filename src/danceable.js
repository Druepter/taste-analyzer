import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import discoImageSmall from "./assets/disco_klein.png"
import ButtonCreatePlaylist from "./buttonCreatePlaylist";


export default function Danceable({danceableTracks, createPlaylist}){


    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white"}} maxWidth="md">

            <CategoryPageHeader
              title='Deine Tanzbaren Songs'
              image={discoImageSmall}
              description='In deinen Lieblingssongs finden sich einige Lieder zu denen sich super das Tanzbein schwingen lässt:'>         
            </CategoryPageHeader>
            <TrackList tracks={danceableTracks}></TrackList>
            

            <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Tanzbare Songs" tracks={danceableTracks}></ButtonCreatePlaylist>


          </Container>
        </>
    )}