import { root } from "postcss";
import React, {useEffect, useState} from "react";
import UserName from "./userName";


export default function Home({getFavoriteTracks, getAudioFeatures}){

    useEffect(() => {
        getFavoriteTracks()
        //getAudioFeatures()
    }, [])

    return (
        <>
            <div>
            Hallo, <UserName></UserName>!<br></br>
            Wir können nun mit der Analyse deines Musikgeschmacks beginnen!<br></br>
            Klicke dazu auf den Button weiter!
            </div>
        </>
    )
}

