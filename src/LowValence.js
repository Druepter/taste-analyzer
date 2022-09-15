import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import CategoryPageHeader from "./categoryPageHeader";
import Container from '@mui/material/Container';
import ButtonCreatePlaylist from "./buttonCreatePlaylist";
import lowValenceImage from "./assets/traurig_mittel.jpg"

export default function LowValence({tracksWithLowValence, createPlaylist}){

    return (
        <>
          <Container sx={{boxShadow: 1}}style={{backgroundColor: "white", padding: 0}} maxWidth="md">

            <CategoryPageHeader
              title='Traurige Songs'
              image={lowValenceImage}
              description='Auch traurige Songs gehören zu deinem Repertoire'>         
            </CategoryPageHeader>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
              <TrackList tracks={tracksWithLowValence}></TrackList>
              <ButtonCreatePlaylist createPlaylist={createPlaylist} title="Traurige Songs" tracks={tracksWithLowValence}></ButtonCreatePlaylist>
            </Container>

          </Container>
        </>
    )}