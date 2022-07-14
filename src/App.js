import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import UserName from "./userName";
import { render } from "@testing-library/react";
import DanceableSongs from "./danceableSongs";
import Danceable from "./danceable";
import {Helmet} from "react-helmet";
import LowValence from "./LowValence";



function App() {
 

  const CLIENT_ID = "3795ba2e521e49a2b84c2fa29eb5f18d"
  const REDIRECT_URI = "http://localhost:3000/home"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")


  const [favoriteTracksShortTerm, setFavoriteTracksShortTerm] = useState([])
  const [favoriteTracksMediumTerm, setFavoriteTracksMediumTerm] = useState([])
  const [favoriteTracksLongTerm, setFavoriteTracksLongTerm] = useState([])
  const [allFavoriteTracks, setAllFavoriteTracks] = useState([])

  const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = useState([])
  const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = useState([])
  const [audioFeaturesLongTerm, setAudioFeaturesLongTerm] = useState([])
  const [allAudioFeatures, setAllAudioFeatures] = useState([])

  const [currentUsersProfile, setCurrentUsersProfile] = useState([])

  const [isLoadingShortTerm, setIsLoadingShortTerm] = useState(true);
  const [isLoadingMediumTerm, setIsLoadingMediumTerm] = useState(true);
  const [isLoadingLongTerm, setIsLoadingLongTerm] = useState(true);

  const [danceableTracks, setDanceableTracks] = useState();
  const danceableTracksArray = []

  const [tracksWithLowValence, setTracksWithLowValence] = useState();
  const tracksWithLowValenceArray = []

  const [tracksWithHighValence, setTracksWithHighValence] = useState();
  const tracksWithHighValenceArray = []

  var favoriteTracksArrayShortTerm
  var favoriteTracksArrayMediumTerm
  var favoriteTracksArrayLongTerm
  var audioFeaturesArray

  var scope = 'user-read-private user-read-email user-top-read';



  useEffect(() => {
    console.log("danceableTracks wurde geändert")
    console.log(danceableTracks)
  }, [danceableTracks])


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = "";
      window.localStorage.setItem("token", token)
      
    }

    setToken(token)
    console.log(token)

  }, [])

  useEffect(() => {
    console.log(token)

  }, [token])



  useEffect(() => {
    //Wenn alle drei Favorite Tracks Kategorien geladen sind, dann konkatiniere sie
    if(isLoadingShortTerm == false && isLoadingMediumTerm == false && isLoadingLongTerm == false){
      concatFavoriteTracks()
    }
  }, [isLoadingShortTerm, isLoadingMediumTerm, isLoadingLongTerm])

  useEffect(() => {
    //Wenn Alle Favorite Songs fertig zusammengebaut sind dann führe das hier aus
    //Hier alle Methoden die gebraucht werden aufrufen
    //Accoustic Songs
    //Danceable Songs
    //...
    console.log("Alle Lieblingslieder fertig")
    getDanceableTracks()
    getTracksWithLowValence()
    getTracksWithHighValence()
  }, [allFavoriteTracks])



  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token");
  }


  const getFav = () => {
    console.log(favoriteTracksShortTerm[0])
  }

  
  //In dieser Function werden die Audio Features 50 beliebesten Tracks des aktuellen Nutzers der Spotify API geladen
  const getFavoriteTracksAudioFeaturesShortTerm = async () => {

    //Token für die Authentifikation aus dem Local Storage holen
    var localStorageToken = window.localStorage.getItem('token')
    
    //Anfrage an die Api stellen
    //Hier werden die 50 beliebtesten Track geholt
    //ToDo: Alle drei Listen holen (short_term, medium_term, long_term) und dann konkatinieren
    await fetch('https://api.spotify.com/v1/me/top/tracks/?limit=50&time_range=short_term', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${localStorageToken}`
      })
    }).then(response => response.json())
    .then(data => {
      //Wenn die Tracks da sind, setze State und hole Audio Features
      setFavoriteTracksShortTerm(data.items)
      //Auf den State zugreifen, klappte nicht(Warum nicht? Experten fragen)
      //Deshalb hier ein zwischen Array
      favoriteTracksArrayShortTerm = data.items
      //Hole Audio Features
      getAudioFeaturesFromFavoriteTracksShortTerm()

    });   
  }

  //Hole Audio Features der 50 belietesten Tracks
  const getAudioFeaturesFromFavoriteTracksShortTerm = async () => {

    var parameters = '' 

    //Baue String aus IDs für die Paramter zusammen
    for(var i = 0; i < favoriteTracksArrayShortTerm.length; i++){
      parameters = parameters + favoriteTracksArrayShortTerm[i].id
      if(favoriteTracksArrayShortTerm[i + 1] != undefined){
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
      setAudioFeaturesShortTerm(data.audio_features)
      setIsLoadingShortTerm(false)
      audioFeaturesArray = data.audio_features

    });

  }


  //In dieser Function werden die Audio Features 50 beliebesten Tracks des aktuellen Nutzers der Spotify API geladen
  const getFavoriteTracksAudioFeaturesMediumTerm = async () => {

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
      setFavoriteTracksMediumTerm(data.items)
      //Auf den State zugreifen, klappte nicht(Warum nicht? Experten fragen)
      //Deshalb hier ein zwischen Array
      favoriteTracksArrayMediumTerm = data.items
      //Hole Audio Features
      getAudioFeaturesFromFavoriteTracksMediumTerm()

    });   
  }

  //Hole Audio Features der 50 belietesten Tracks
  const getAudioFeaturesFromFavoriteTracksMediumTerm = async () => {

    var parameters = '' 

    //Baue String aus IDs für die Paramter zusammen
    for(var i = 0; i < favoriteTracksArrayMediumTerm.length; i++){
      parameters = parameters + favoriteTracksArrayMediumTerm[i].id
      if(favoriteTracksArrayMediumTerm[i + 1] != undefined){
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
      setAudioFeaturesMediumTerm(data.audio_features)
      setIsLoadingMediumTerm(false)
      audioFeaturesArray = data.audio_features

    });

  }


  //In dieser Function werden die Audio Features 50 beliebesten Tracks des aktuellen Nutzers der Spotify API geladen
  const getFavoriteTracksAudioFeaturesLongTerm = async () => {

    //Token für die Authentifikation aus dem Local Storage holen
    var localStorageToken = window.localStorage.getItem('token')
    
    //Anfrage an die Api stellen
    //Hier werden die 50 beliebtesten Track geholt
    //ToDo: Alle drei Listen holen (short_term, medium_term, long_term) und dann konkatinieren
    await fetch('https://api.spotify.com/v1/me/top/tracks/?limit=50&time_range=long_term', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${localStorageToken}`
      })
    }).then(response => response.json())
    .then(data => {
      //Wenn die Tracks da sind, setze State und hole Audio Features
      setFavoriteTracksLongTerm(data.items)
      //Auf den State zugreifen, klappte nicht(Warum nicht? Experten fragen)
      //Deshalb hier ein zwischen Array
      favoriteTracksArrayLongTerm = data.items
      //Hole Audio Features
      getAudioFeaturesFromFavoriteTracksLongTerm()

    });   
  }

  //Hole Audio Features der 50 belietesten Tracks
  const getAudioFeaturesFromFavoriteTracksLongTerm = async () => {

    var parameters = '' 

    //Baue String aus IDs für die Paramter zusammen
    for(var i = 0; i < favoriteTracksArrayLongTerm.length; i++){
      parameters = parameters + favoriteTracksArrayLongTerm[i].id
      if(favoriteTracksArrayLongTerm[i + 1] != undefined){
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
      setAudioFeaturesLongTerm(data.audio_features)
      setIsLoadingLongTerm(false)
      audioFeaturesArray = data.audio_features

    });

  }



  const concatFavoriteTracks = () => {

    //ToDo: alle drei Arrays vereinen

    var allFavoriteTracksArray = favoriteTracksShortTerm.concat(favoriteTracksMediumTerm)
    //var allFavoriteTracksNew = allFavoriteTracks.concat(favoriteTracksArrayLongTerm)
    //console.log(allFavoriteTracks)
    //console.log(allFavoriteTracksNew)
    var allFavoriteTracksWithoutDuplicates = removeDuplicates(allFavoriteTracksArray)
    console.log(allFavoriteTracksWithoutDuplicates)
    setAllFavoriteTracks(allFavoriteTracksWithoutDuplicates)
    
    var allFavoriteTracksAudioFeatures = audioFeaturesShortTerm.concat(audioFeaturesMediumTerm)
    //allFavoriteTracksAudioFeatures = allFavoriteTracksAudioFeatures.concat(audioFeaturesLongTerm)
    var allFavoriteTracksAudioFeaturesWithoutDuplicates = removeDuplicates(allFavoriteTracksAudioFeatures)
    console.log(allFavoriteTracksAudioFeaturesWithoutDuplicates)
    setAllAudioFeatures(allFavoriteTracksAudioFeaturesWithoutDuplicates)
  }

  function removeDuplicates(inArray){
    var arr = inArray.concat() // create a clone from inArray so not to change input array
    //create the first cycle of the loop starting from element 0 or n
    for(var i=0; i<arr.length; ++i) { 
        //create the second cycle of the loop from element n+1
        for(var j=i+1; j<arr.length; ++j) { 
            //if the two elements are equal , then they are duplicate
            if(arr[i].id === arr[j].id) {
                arr.splice(j, 1); //remove the duplicated element 
            }
        }
    }
    return arr;
  }


  const handleHomeOnClick = () => {

    window.location = "dancealbe"


    concatFavoriteTracks()
    getDanceableTracks()

  }

  

  const getDanceableTracks = () => {

    //Iteriere über Audio Features Array
    //Wenn danceibilty über 70% ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array

    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      if(allAudioFeatures[i].danceability > 0.7){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      const trackInformation = []
      trackInformation.push(allAudioFeatures[i].id)
      trackInformation.push(trackName)
      trackInformation.push(allFavoriteTracks[i].artists)  

      danceableTracksArray.push(trackInformation)
      }
      
    }
    console.log(danceableTracksArray)
    setDanceableTracks(danceableTracksArray)
  }



  const getTracksWithLowValence = () => {
    //Iteriere über Audio Features Array
    //Wenn Valence unter 0.3 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array

    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      if(allAudioFeatures[i].valence < 0.25){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      const trackInformation = []
      trackInformation.push(allAudioFeatures[i].id)
      trackInformation.push(trackName)
      trackInformation.push(allFavoriteTracks[i].artists)
    
      tracksWithLowValenceArray.push(trackInformation)
      }
      
    }
    console.log(tracksWithLowValenceArray)
    setTracksWithLowValence(tracksWithLowValenceArray)
  }
 
  const getTracksWithHighValence = () => {
    //Iteriere über Audio Features Array
    //Wenn Valence unter 0.3 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array

    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      if(allAudioFeatures[i].valence > 0.7){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      const idAndName = []
      idAndName.push(allAudioFeatures[i].id)
      idAndName.push(trackName)
    
      tracksWithHighValenceArray.push(idAndName)
      }
      
    }
    console.log(tracksWithHighValenceArray)
    setTracksWithHighValence(tracksWithHighValenceArray)
  }





  return (
    <>
      <Router>
        {!token ?
          <Login _AUTH_ENDPOINT={AUTH_ENDPOINT} _CLIENT_ID={CLIENT_ID} _REDIRECT_URI={REDIRECT_URI} _RESPONSE_TYPE={RESPONSE_TYPE} _scope={scope}></Login>
          

        : <button onClick={logout}>Logout</button>} 


        {token ?
          <>

            {isLoadingShortTerm == false && isLoadingMediumTerm == false && isLoadingLongTerm == false ?
              <>
                {/*<div>{favoriteTracksShortTerm[0].name}</div>
                <div>{audioFeaturesShortTerm[0].energy}</div>*/}
              </>
            :
              <>
                <div>Wird geladen</div>
              </> 
            }
            
          </>
          

          :
          <p></p>
        } 



        <Routes>
          <Route path="/home" element={<Home getFavoriteTracksAudioFeaturesShortTerm={getFavoriteTracksAudioFeaturesShortTerm} getFavoriteTracksAudioFeaturesMediumTerm={getFavoriteTracksAudioFeaturesMediumTerm} getFavoriteTracksAudioFeaturesLongTerm={getFavoriteTracksAudioFeaturesLongTerm} concatFavoriteTracks={handleHomeOnClick} token={token}/>}></Route>   
          <Route path="/danceable" element={<Danceable danceableTracks={danceableTracks}/>}></Route> 
          <Route path="/lowValence" element={<LowValence tracksWithLowValence={tracksWithLowValence}/>}></Route> 
          
        </Routes> 


      </Router>

      <Helmet>
          <title>Spotify Taste Analyzer</title>
          
    </Helmet>
    </>
  );
}

export default App;
