import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default function LowValence({danceableTracks, token}){

    

    useEffect(() =>{
        console.log(danceableTracks)
        console.log(token)
    }, [])




    return (
        <>
          <div>Zu einem Teil deiner Lieblingssongs lässt sich sehr gut tanzen.</div>
          <div>Diese Songs sind hier zu sehen:</div>
        </>
    )}