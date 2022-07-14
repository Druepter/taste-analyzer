import React, { useState, useEffect} from "react";
import TrackList from "./trackList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


export default function Danceable({danceableTracks}){

    return (
        <>
          <div>Zu einem Teil deiner Lieblingssongs lässt sich sehr gut tanzen.</div>
          <br></br>
          <div>Diese Songs sind hier zu sehen:</div>
          <br></br>
          <TrackList tracks={danceableTracks}></TrackList>
          <br></br>

          <Link to="/lowValence">Weiter zur Auswertung</Link>

        </>
    )}