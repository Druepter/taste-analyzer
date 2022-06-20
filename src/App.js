import React, { useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import LoginTest from "./loginTest.js";




function App() {
 

  const CLIENT_ID = "3795ba2e521e49a2b84c2fa29eb5f18d"
  const REDIRECT_URI = "http://localhost:3000/test"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  var scope = 'user-read-private user-read-email user-top-read';


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = "";
      window.localStorage.setItem("token", token)
      
    }

    setToken(token)

  }, [])


  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token");
  }


  const getFavoriteArtists = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    console.log(data);

  }

  

  return (
    <>
      <Router>
        <h1>Taste Analyzer</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`}>Login to Spotify</a>

        : <button onClick={logout}>Logout</button>} 


        {token ?
          <button onClick={getFavoriteArtists}>
            Get Favorite Artists
          </button>
          :
          <p>Bitte einloggen</p>
        } 

        <form action="/til">
          <button type="submit">
            Weiter
          </button>
        </form>

        <Routes>
          <Route path="/" element={<LoginTest _AUTH_ENDPOINT={AUTH_ENDPOINT} _CLIENT_ID={CLIENT_ID} _REDIRECT_URI={REDIRECT_URI} _RESPONSE_TYPE={RESPONSE_TYPE} _scope={scope}/>}></Route>
          <Route path="/til" element={<Home />}></Route>  
          <Route path="/test" element={<div>hallo</div>}></Route>
        </Routes> 


      </Router>
    </>
  );
}

export default App;
