import { root } from "postcss";
import React, {useEffect, useState} from "react";
import UserName from "./userName";


export default function Home({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, concatFavoriteTracks}){

    useEffect(() => {
        getFavoriteTracksAudioFeaturesShortTerm()
        getFavoriteTracksAudioFeaturesMediumTerm()
        getFavoriteTracksAudioFeaturesLongTerm()
        //concatFavoriteTracks()
        //getAudioFeatures()
    }, [])

    return (
        <>
            
            <div>
            Hallo, <UserName></UserName>!<br></br>
            Wir können nun mit der Analyse deines Musikgeschmacks beginnen!<br></br>
            Klicke dazu auf den Button weiter!
            <br></br>
            <button onClick={concatFavoriteTracks}>Weiter zur Auswertung</button>
            </div>
        </>
    )
}

