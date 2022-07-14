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



  


  var favoriteTracksArrayShortTerm
  var favoriteTracksArrayMediumTerm
  var favoriteTracksArrayLongTerm
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



  useEffect(() => {
    console.log("Short Term geladen");
    console.log(favoriteTracksArrayShortTerm)
    console.log(favoriteTracksShortTerm)

  }, [isLoadingShortTerm])



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

    console.log(favoriteTracksArrayShortTerm)

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


    console.log(favoriteTracksLongTerm)

    var allFavoriteTracks = favoriteTracksShortTerm.concat(favoriteTracksMediumTerm)
    //var allFavoriteTracksNew = allFavoriteTracks.concat(favoriteTracksArrayLongTerm)
    //console.log(allFavoriteTracks)
    //console.log(allFavoriteTracksNew)
    var allFavoriteTracksWithoutDuplicates = removeDuplicates(allFavoriteTracks)
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

    concatFavoriteTracks()
    //getDanceableTracks()

  }



  const logAudioFeatures = () => {
    concatFavoriteTracks()
    console.log(audioFeaturesShortTerm)
    console.log(audioFeaturesMediumTerm)
  }









  const danceableTracks = []

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
      const idAndName = []
      idAndName.push(allAudioFeatures[i].id)
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
            <button onClick={getFavoriteTracksAudioFeaturesShortTerm}>
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
            <div>Hier sind die audioFeatures: {audioFeaturesShortTerm.danceability}</div>

          

            {isLoadingShortTerm == false && isLoadingMediumTerm == false && isLoadingLongTerm == false ?
              <>
                <div>{favoriteTracksShortTerm[0].name}</div>
                <div>{audioFeaturesShortTerm[0].energy}</div>
              </>
            :
              <>
                <div>Wird geladen</div>
              </> 
            }
            
            <button onClick={logAudioFeatures}>
              Get Data 
            </button>
            <button onClick={getAudioFeaturesFromFavoriteTracksShortTerm}>
              Baue String zusammen
            </button>
            <br></br>
            <DanceableSongs danceability={audioFeaturesShortTerm.danceability}></DanceableSongs>
            <br></br>
            <UserName></UserName>

          

           
          </>
          

          :
          <p></p>
        } 



        <Routes>
          <Route path="/home" element={<Home getFavoriteTracksAudioFeaturesShortTerm={getFavoriteTracksAudioFeaturesShortTerm} getFavoriteTracksAudioFeaturesMediumTerm={getFavoriteTracksAudioFeaturesMediumTerm} getFavoriteTracksAudioFeaturesLongTerm={getFavoriteTracksAudioFeaturesLongTerm} concatFavoriteTracks={handleHomeOnClick}/>}></Route>
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
