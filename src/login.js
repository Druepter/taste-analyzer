import { Fragment } from 'react'
import React, { useState, useEffect} from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import App from "./App";

export default function Login({_AUTH_ENDPOINT, _CLIENT_ID, _REDIRECT_URI, _RESPONSE_TYPE, _scope}) {

  return (
    <>
      <Container sx={{boxShadow: 1}}style={{backgroundColor: "white"}} maxWidth="md">
                        <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
                            Spotify Taste Analyzer
                        </Typography>
                        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                          Du hast dich immer schoneimal gefragt was für ein Typ Musikhörer du bist?
                          Du möchtest deinen Musikgeschmack klassifizieren?
                          Dann ist der Spotify Taste Analyzer das richtige für dich.
                          Wir werden deinen Musikgeschmack unter die Lupe nehmen und dir dein Idividuelles Profil berechnen
                        </Typography>


                        <Button variant="contained" href={`${_AUTH_ENDPOINT}?client_id=${_CLIENT_ID}&redirect_uri=${_REDIRECT_URI}&response_type=${_RESPONSE_TYPE}&scope=${_scope}`}>Mit Spotify einloggen</Button>
      </Container>
    </>         
  )
}