import { Fragment } from 'react'
import React, { useState, useEffect} from "react";
import axios from "axios";
import Button from '@mui/material/Button';

import App from "./App";

export default function Login({_AUTH_ENDPOINT, _CLIENT_ID, _REDIRECT_URI, _RESPONSE_TYPE, _scope}) {

  return (
    <>
      <Button variant="contained" href={`${_AUTH_ENDPOINT}?client_id=${_CLIENT_ID}&redirect_uri=${_REDIRECT_URI}&response_type=${_RESPONSE_TYPE}&scope=${_scope}`}>Mit Spotify einloggen</Button>
      <a
        href={`${_AUTH_ENDPOINT}?client_id=${_CLIENT_ID}&redirect_uri=${_REDIRECT_URI}&response_type=${_RESPONSE_TYPE}&scope=${_scope}`}
      >
        Mit Spotify einloggen
      </a>
    </>         
  )
}