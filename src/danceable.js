import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default function Danceable({danceableTracks, token}){

   

    useEffect(() =>{
        console.log(danceableTracks)
        console.log(token)
    }, [])




    return (
        <>
          <div>Deine tanzbaren Songs:</div>
        </>
    )}