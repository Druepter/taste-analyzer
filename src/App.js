import React, { useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import UserName from "./userName";
import { render } from "@testing-library/react";
import DanceableSongs from "./danceableSongs";




function App() {
 

  const CLIENT_ID = "3795ba2e521e49a2b84c2fa29eb5f18d"
  const REDIRECT_URI = "http://localhost:3000/test"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [favoriteTracks, setFavoriteTracks] = useState([])
  const [currentUsersProfile, setCurrentUsersProfile] = useState([])

  const [isLoading, setIsLoading] = useState(true);



  const [audioFeatures, setAudioFeatures] = useState([])


  var favoriteTracksArray
  var audioFeaturesArray

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


  const getFav = () => {
    console.log(favoriteTracks[0])
  }

  
  //In dieser Function werden die Audio Features 50 beliebesten Tracks des aktuellen Nutzers der Spotify API geladen
  const getFavoriteTracksAudioFeatures = async () => {

    //Token für die Authentifikation aus dem Local Storage holen
    var localStorageToken = window.localStorage.getItem('token')
    
    //Anfrage an die Api stellen
    //Hier werden die 50 beliebtesten Track geholt
    //ToDo: Alle drei Listen holen (short_term, medium_term, long_term) und dann konkatinieren
    await fetch('https://api.spotify.com/v1/me/top/tracks/?limit=50&time_range=medium_term', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${localStorageToken}`
      })
    }).then(response => response.json())
    .then(data => {
      //Wenn die Tracks da sind, setze State und hole Audio Features
      setFavoriteTracks(data.items)
      //Auf den State zugreifen, klappte nicht(Warum nicht? Experten fragen)
      //Deshalb hier ein zwischen Array
      favoriteTracksArray = data.items
      //Hole Audio Features
      getAudioFeaturesFromFavoriteTracks()

    });    
  }

  //Hole Audio Features der 50 belietesten Tracks
  const getAudioFeaturesFromFavoriteTracks = async () => {

    var parameters = '' 

    //Baue String aus IDs für die Paramter zusammen
    for(var i = 0; i < favoriteTracksArray.length; i++){
      parameters = parameters + favoriteTracksArray[i].id
      if(favoriteTracksArray[i + 1] != undefined){
        parameters = parameters + ","
      }
    }

    //Token aus lokal storage holen
    var localStorageToken = window.localStorage.getItem('token')

    await fetch("https://api.spotify.com/v1/audio-features/?ids=" + parameters, {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${localStorageToken}`
      })
    }).then(response => response.json())
    .then(data => {
      //Setze State Audio Features und isLoading auf false
      setAudioFeatures(data.audio_features)
      setIsLoading(false)
      audioFeaturesArray = data.audio_features

      console.log(audioFeaturesArray)
      console.log(favoriteTracksArray)
    });

  }

  const danceableTracks = []

  const getDanceableTracks = () => {

    //Iteriere über Audio Features Array
    //Wenn danceibilty über 70% ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array

    for(var i=0; i < audioFeatures.length; i++){

      var trackName = ""

      if(audioFeatures[i].valence > 0.7){
        for(var j=0; j < favoriteTracks.length; j++){
          if(audioFeatures[i].id == favoriteTracks[j].id){
            trackName = favoriteTracks[j].name
          }
        }
      const idAndName = []
      idAndName.push(audioFeatures[i].id)
      idAndName.push(trackName)
        

      danceableTracks.push(idAndName)
      }

      
    }
    console.log(danceableTracks)

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





  

  const getCurrentUsersProfile = async () => {

    console.log(token)

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
  /*const renderFavoriteTracks = () => {
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
  }*/

  return (
    <>
      <Router>
        {!token ?
          <Login _AUTH_ENDPOINT={AUTH_ENDPOINT} _CLIENT_ID={CLIENT_ID} _REDIRECT_URI={REDIRECT_URI} _RESPONSE_TYPE={RESPONSE_TYPE} _scope={scope}></Login>
         

        : <button onClick={logout}>Logout</button>} 


        {token ?
          <>
            <button onClick={getFavoriteTracksAudioFeatures}>
              Get Favorite Tracks
            </button>
            <br></br>
        
            <br></br>
            <button onClick={getCurrentUsersProfile}>
              Get User Profile 
            </button>
            <button onClick={getData}>
              Get Data 
            </button>
            <br></br>
            <br></br>
            <button onClick={getDanceableTracks}>
              Get Danceable Tracks
            </button>
            <br></br>
            <button >
              Fetch Data
            </button>
            <br></br>
            <div>Hier sind die audioFeatures: {audioFeatures.danceability}</div>
            {isLoading ?
              <div>Wird geladen</div>
            :
              <>
                <div>{favoriteTracks[0].name}</div>
                <div>{audioFeatures[0].energy}</div>
              </> 
            }
            
            <button onClick={getFav}>
              Get Data 
            </button>
            <button onClick={getAudioFeaturesFromFavoriteTracks}>
              Baue String zusammen
            </button>
            <br></br>
            <DanceableSongs danceability={audioFeatures.danceability}></DanceableSongs>
            <br></br>
            <UserName></UserName>

          

           
          </>
          

          :
          <p></p>
        } 



        <Routes>
          <Route path="/home" element={<Home getFavoriteTracks={getFavoriteTracksAudioFeatures} getAudioFeatures={getAudioFeaturesFromFavoriteTracks}/>}></Route>
          <Route path="/home2" element={<Home getCurrentUsersProfile={getCurrentUsersProfile}/>}></Route>    


          <Route path="/til" element={<Home currentUsersProfile/>}></Route>  
    
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
