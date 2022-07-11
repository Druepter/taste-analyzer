import React, { useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import { render } from "@testing-library/react";




function App() {
 

  const CLIENT_ID = "3795ba2e521e49a2b84c2fa29eb5f18d"
  const REDIRECT_URI = "http://localhost:3000/test"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [favoriteTracks, setFavoriteTracks] = useState([])
  const [currentUsersProfile, setCurrentUsersProfile] = useState([])


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

  useEffect(() => {
    console.log("Hallo");
    
  })




  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token");
  }


  const getFavoriteTracks = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks/?limit=50&time_range=long_term", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    console.log(data);

    setFavoriteTracks(data.items)
    
  }

  //todo
  //String aus allen Ids der Favorite Tracks zusammenbauen


  //const params = new URLSearchParams([['ids', '7ouMYWpwJ422jRcDASZB7P', '4VqPOruhp5EdPBeR92t6lQ']])
  const parameter = '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ'

  const getAudioFeatures = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/audio-features/", {
      params: {
        ids: parameter
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    console.log(data);
  }



  async function getData() {
    const {data} = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    console.log(data)
    return data
  }


  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    

    await fetch('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    }).then(response => response.json())
    .then(data => {
      setIsLoading(false)
      console.log(data)
    });

    /*const {data} = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    console.log(data)

    data.then(
      function(value) {
          setIsLoading(false)
          console.log(data)
      },
      function(error) {
          
      }
    );*/



  }


  const getCurrentUsersProfile = async () => {
    const {data} = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    console.log(data);
    return data
    //setCurrentUsersProfile(data)
  }

  const getCurrentUsersName = () => {
    console.log("Hole dir die Daten des Nutzers");
    getCurrentUsersProfile()
    console.log("Hier wird die Funktion getCurrentUsersName aufgerufen");
  }


  const renderCurrentUsersName = () => {
    if(!currentUsersProfile)
      getCurrentUsersProfile()  
      
    return(
      <>
        <div>{currentUsersProfile.name}</div>
      </>
    )
  }


  //Eigene Komponete Favorite Tracks
  //Diese nimmt Tracks von Spotify Api entgegen und gibt diese aus
  //Oder nimmt Liste entgegen
  //Sont kümmert die sich nur um die darstellung und wird in andere Komponenten eingebunden
  const renderFavoriteTracks = () => {
    console.log("Render Favorite Tracks")
    return( 
      
      <>

        {favoriteTracks.map((track) => (
          <>
          <div>{track.name}</div>
          </>
        ))}
      </>
      
    )
  }

  return (
    <>
      <Router>
        {!token ?
          <Login _AUTH_ENDPOINT={AUTH_ENDPOINT} _CLIENT_ID={CLIENT_ID} _REDIRECT_URI={REDIRECT_URI} _RESPONSE_TYPE={RESPONSE_TYPE} _scope={scope}></Login>
         

        : <button onClick={logout}>Logout</button>} 


        {token ?
          <>
            <button onClick={getFavoriteTracks}>
              Get Favorite Tracks
            </button>
            <br></br>
            <button onClick={getAudioFeatures}>
              Get Audio Features
            </button>
            <br></br>
            <button onClick={getCurrentUsersProfile}>
              Get User Profile 
            </button>
            <button onClick={getData}>
              Get Data 
            </button>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={fetchData}>
              Fetch Data
            </button>
            <br></br>
            {isLoading ?
              <div>wird geladen</div>

            :
              <div>ist geladen</div>  
            }
            <br></br>
            <br></br>
            {renderFavoriteTracks()}
           
          </>
          

          :
          <p></p>
        } 



        <Routes>
          <Route path="/home" element={<Home getCurrentUsersProfile={getData}/>}></Route>
          <Route path="/home2" element={<Home getCurrentUsersProfile={getCurrentUsersProfile}/>}></Route>    


          <Route path="/til" element={<Home currentUsersProfile/>}></Route>  
          <Route path="/test" element={<div>hallo {renderFavoriteTracks()}</div>}></Route>
          <Route path="/zweiteSeite" element={<div>Dein Musikgeschmack ist sehr
            vielfältig. Auf den folgenden Slides haben wir dieses geneuer
            analysiert und geguckt was für ein Musiktyp du bist!
          </div>}></Route>

          <Route path="/zweiteSeiteAlternativ" element={<div>Du hast einen sehr
            Eindeutigen Musikgeschmack mit eindeutigen Präferenzen. Auf den
            nächsten Slides sind diese genauer beleuchtet.

          </div>}></Route>
        </Routes> 


      </Router>
    </>
  );
}

export default App;
