import { root } from "postcss";
import React, {useEffect, useState} from "react";
import UserName from "./userName";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Danceable from "./danceable";


export default function Home({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, concatFavoriteTracks, token}){

    useEffect(() => {

            //getFavoriteTracksAudioFeaturesShortTerm()
            //getFavoriteTracksAudioFeaturesMediumTerm()
            //getFavoriteTracksAudioFeaturesLongTerm()


            //concatFavoriteTracks()
            //getAudioFeatures()
        

    }, [])


    useEffect(() => {
        //Es wird gewartet bis der Token geladen ist
        //Dann ist die Anwendung bereit für Abfragen
        if(token == ""){

        }
        else{
            //Alle Lieblingssongs werden geholt
            //Über die use Effekt Methoden von App.js werden die weiteren Abfragen verarbeitet
            getFavoriteTracksAudioFeaturesShortTerm()
            getFavoriteTracksAudioFeaturesMediumTerm()
            getFavoriteTracksAudioFeaturesLongTerm() 
        }
       
      
    }, [token])

    return (
        <>
            
            <div>
            {/***Hallo, <UserName></UserName>!<br></br>*/} 
            Wir können nun mit der Analyse deines Musikgeschmacks beginnen!<br></br>
            Klicke dazu auf den Button weiter!
            <br></br>
            {/* Eigentlich muss dies hier zu einer Seite führen, welche verschiedene Routen zu 
            verschiedenen Anwendungsfällen besitzt */}
            <Link to="/danceable">Weiter zur Auswertung</Link>
            <button onClick={concatFavoriteTracks}>Weiter zur Auswertung</button>
            </div>


                
          

        </>
    )
}

