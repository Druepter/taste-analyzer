import React, { useState, useEffect} from "react";
import TrackList from "./trackList";


export default function LowValence({tracksWithLowValence}){

    return (
        <>
          <div>Auch traurige Musik darf in deinem Katalog nicht fehlen.</div>
          <br></br>
          <div>Diese Songs sind hier zu sehen:</div>
          <br></br>
          <TrackList tracks={tracksWithLowValence}></TrackList>
          <br></br>

        </>
    )}