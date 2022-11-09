import React, { useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Home from "./home";
import Login from "./login";
import MyAppBar from "./AppBar";
import Danceable from "./danceable";
import {Helmet} from "react-helmet";
import LowValence from "./LowValence";
import HighValence from "./HighValence";
import Acoustic from "./Acoustic";
import Instrumental from "./Instrumental";
import Live from "./Live";
import danceableImageSmall from "./assets/tanzbar_klein.jpg"
import lowValenceImageSmall from "./assets/traurig_klein.jpg"
import highValenceImageSmall from "./assets/gluecklich_klein.jpg";
import acousticImageSmall from "./assets/akustik_klein.jpg";
import instrumentalImageSmall from "./assets/instrumental_klein.jpg";
import liveImageSmall from "./assets/live_klein.jpg";
import highEnergyImageSmall from "./assets/energetisch_klein.jpg";
import lowEnergyImageSmall from "./assets/ruhig_klein.jpg";
import HighEnergy from "./HighEnergy";
import LowEnergy from "./LowEnergy";
import BigFive from "./BigFive"
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import StatementContainer from "./StatementContainer";


function App() {
 
  //Farben der Anwendnung
  const theme = createTheme({
    palette: {
      primary: {
        light: '#ecf7ed',
        main: '#e8f5e9',
        dark: '#a2aba3',
        contrastText: '#000',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  //Varibalen für Spotify for Developers
  //ID der Anwendnung
  const CLIENT_ID = "3795ba2e521e49a2b84c2fa29eb5f18d"
  //Seite auf welche weitergeleitet werden soll, wenn Login erfolgreich
  const REDIRECT_URI = "http://localhost:3000/home"
  //Authenrifikationsendpunkt
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  //Token soll zurückkommen bei erfolgreichem login
  const RESPONSE_TYPE = "token"
  //Varible, welche Berechtigungen diese Anwendung für den eingeloggten Spotify Account braucht
  var scope = 'user-read-private user-read-email user-top-read playlist-modify-public playlist-modify-private';


  //State für Token
  const [token, setToken] = useState("")

  //States für die Lieblingssongs
  const [favoriteTracksShortTerm, setFavoriteTracksShortTerm] = useState([])
  const [favoriteTracksMediumTerm, setFavoriteTracksMediumTerm] = useState([])
  const [favoriteTracksLongTerm, setFavoriteTracksLongTerm] = useState([])
  const [allFavoriteTracks, setAllFavoriteTracks] = useState([])

  //States für die AudioFeatures
  const [audioFeaturesShortTerm, setAudioFeaturesShortTerm] = useState([])
  const [audioFeaturesMediumTerm, setAudioFeaturesMediumTerm] = useState([])
  const [audioFeaturesLongTerm, setAudioFeaturesLongTerm] = useState([])
  const [allAudioFeatures, setAllAudioFeatures] = useState([])

  //State für das Profil des akutellen Benutzers
  const [currentUsersProfile, setCurrentUsersProfile] = useState([])

  //States um die Ladezeiten zu koodinieren
  const [isLoadingShortTerm, setIsLoadingShortTerm] = useState(true)
  const [isLoadingMediumTerm, setIsLoadingMediumTerm] = useState(true)
  const [isLoadingLongTerm, setIsLoadingLongTerm] = useState(true)
  const [isLoadingCurrentUsersProfile, setIsLoadingCurrentUsersProfile] = useState(true)
  const [isLoadingAll, setIsLoadingAll] = useState(true)
  const [readyToRender, setReadyToRender] = useState(false)
  const [readyToBuildDashboard, setReadyToBuildDashboard] = useState(false)

  //Arrays und States für einzelne Song Kategorien
  const [danceableTracks, setDanceableTracks] = useState();
  const danceableTracksArray = []
  const [tracksWithLowValence, setTracksWithLowValence] = useState()
  const tracksWithLowValenceArray = []
  const [tracksWithHighValence, setTracksWithHighValence] = useState()
  const tracksWithHighValenceArray = []
  const [acousticTracks, setAcousticTracks] = useState();
  const acousticTracksArray = []
  const [instrumentalTracks, setInstrumentalTracks] = useState();
  const instrumentalTracksArray = []
  const [liveTracks, setLiveTracks] = useState()
  const liveTracksArray = []
  const [tracksWithHighEnergy, setTracksWithHighEnergy] = useState()
  const tracksWithHighEnergyArray = []
  const [tracksWithLowEnergy, setTracksWithLowEnergy] = useState()
  const tracksWithLowEnergyArray = [] 

  //States für das Kreisdigramm auf der Homepage
  const [chartColors, setChartColors] = useState()
  const [chartData, setChartData] = useState()
  const [chartLabels, setChartLabels] = useState()

  //Dieser State speichert Informationen über die einzelnen Songs Kategorien für die Homepage
  const [trackCategories, setTrackCategories] = useState()

  //State für die AppBar
  //Gibt an auf welcher Seite sich die Anwendung gerade befindet
  const [renderState, setRenderState] = useState('home')


  //Valence und Arousal State
  const [valence, setValence] = useState()
  const [arousal, setArousal] = useState()	

  //Arrays für die Lieblingssongs und AudioFeatures
  var favoriteTracksArrayShortTerm
  var favoriteTracksArrayMediumTerm
  var favoriteTracksArrayLongTerm
  var audioFeaturesArray

  var mysql = require('mysql');

  const mysql_user = {
    host: 'localhost',
    user: 'root',
    password: 'password',
  };

  /*const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'spotify_data'
  });*/

  /*var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
  });

  con.connect();*/




  /*const mysql_user = {
    host: 'localhost',
    user: 'root',
    password: 'passwort',
  };

  const connection = mysql.createConnection(mysql_user, {
    multipleStatements: true,
  });*/

  ////////////// USE EFEEKT HOOKS ///////////////////

  //Diese Hook wird immer aufgeführt wenn die Seite neu gerendert wird
  useEffect(() => {

    //Lese hash aus URL aus
    const hash = window.location.hash
    //Hole token aus local Storage
    let token = window.localStorage.getItem("token")

    //Wenn ein Token vorhanden ist dann gehe direkt auf die Homepage
    if(token && window.location.pathname == "/"){
      window.location.href = "/home"
    }

    //Wenn kein Token vorhanden ist aber hash dann bearbeite den hash
    if(!token && hash){
      //#access_token vor dem hash entfernen = token
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      //token in local storage speichern
      window.location.hash = "";
      window.localStorage.setItem("token", token)
      
    }

    //State für local storage setzen
    setToken(token)
  }, [])

  //Wenn alle drei favorite Track Kategorien und Benutzerprofil von der Spotify API geladen sind, dann führe dies aus
  useEffect(() => {
    //Wenn alle drei Favorite Tracks Kategorien geladen und Bnutzerprofil sind, dann konkatiniere sie
    if(isLoadingShortTerm == false && isLoadingMediumTerm == false && isLoadingLongTerm == false && isLoadingCurrentUsersProfile == false){
      setIsLoadingAll(false)
      concatFavoriteTracks()
    }
  }, [isLoadingShortTerm, isLoadingMediumTerm, isLoadingLongTerm, isLoadingCurrentUsersProfile])

  //Wenn die drei favorite Tracks Kategorien fertig konkatiniert sind dann lade einzelne Track Kategorien
  useEffect(() => {
    //Wenn Alle Favorite Songs fertig zusammengebaut sind dann führe das hier aus
    //Hier alle Methoden die gebraucht werden aufrufen
    //Accoustic Songs
    //Danceable Songs
    //...
    if(isLoadingAll == false){
      getDanceableTracks()
      getTracksWithLowValence()
      getTracksWithHighValence()
      getTracksAcoustic()
      getInstrumentalTracks()
      getLiveTracks()
      getTracksWithHighEnergy()
      getTracksWithLowEnergy()

      sendDataToBackend()

      //console.log("jo")
      //console.log(process)

      /*connection.connect((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Connected to SQL');
        }
      });*/

      console.log("Short Term:")
      getAverageValence(audioFeaturesShortTerm)
      getAverageArousal(audioFeaturesShortTerm)
      console.log("Medium Term:")
      getAverageValence(audioFeaturesMediumTerm)
      getAverageArousal(audioFeaturesMediumTerm)
      console.log("Long Term:")
      getAverageValence(audioFeaturesLongTerm)
      getAverageArousal(audioFeaturesLongTerm)      

      //Nachdem alle Track Kategorien zusammengebaut wurden, wird der State readyToBuildDashboard auf true gesetzt
      //Dadurch wird getriggert, dass das nun alle Informationen vorhanden sind um das Dashboard zu erstellen
      setReadyToBuildDashboard(true)
    }

  }, [allFavoriteTracks])

  //Wenn alle Informationen vorhanden sind um das Dashboard zu erstellen führe diese UseEffect Hook aus
  useEffect(() => {

    //Wenn das Dashboard gebaut werden kann dann tue dies
    if(readyToBuildDashboard == true){
      
      //Hier werden Arrays zusammengebaut welches für das Kreisdiagramm verwendet wird
      //Diese werden an die Komponete Home übergeben, welche diese dann weiter gibt an die Komponente Kreisdiagramm
      //Farben, welche für das Kreisdiagramm verwendet werden sollen
      var colors = []
      //data, Die Datenwerte, welche im Kreisdiagramm verwendet werden => Dies entspricht den Längen der einzelnen Track Arrays
      var data = []
      //label, Der Name, welcher im Kreisdiagramm angezeigt werden soll => Name der Kategorie
      var labels = []

      //Array für Dashboard Karten
      var trackCategoriesArray = []

      //Wenn mehr als 3 akusitsche Songs in den Lieblingssongs sind dann füge sie hinzu
      if(acousticTracks.length >= 3){
        colors.push('#DAB88B')
        data.push(acousticTracks.length)
        labels.push('Akustische Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/acoustic', acousticImageSmall, 'Akustische Songs', 'Organische Klänge', acousticTracks.length, '#DAB88B']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 tanzbare Songs in den Lieblingssongs sind dann füge sie hinzu
      if(danceableTracks.length >= 3){
        colors.push('#8346F9')
        data.push(danceableTracks.length)
        labels.push('Tanzebare Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/danceable', danceableImageSmall, 'Tanzbare Songs', 'Rauf auf die Tanzfläche', danceableTracks.length, '#8346F9']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 fröhliche Songs in den Lieblingssongs sind dann füge sie hinzu
      if(tracksWithHighValence.length >= 3){
        colors.push('#B9E5F0')
        data.push(tracksWithHighValence.length)
        labels.push('Fröhliche Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/highValence', highValenceImageSmall, 'Fröhliche Songs', 'Für die glücklichsten Augenblicke', tracksWithHighValence.length, '#B9E5F0']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 traurige Songs in den Lieblingssongs sind dann füge sie hinzu
      if(tracksWithLowValence.length >= 3){
        colors.push('#5D5852')
        data.push(tracksWithLowValence.length)
        labels.push('Traurige Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/lowValence', lowValenceImageSmall, 'Traurige Songs', 'Alles wird gut', tracksWithLowValence.length, '#5D5852']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 instrumentale Songs in den Lieblingssongs sind dann füge sie hinzu
      if(instrumentalTracks.length >= 3){
        colors.push('#522A4C')
        data.push(instrumentalTracks.length)
        labels.push('Instrumentale Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/instrumental', instrumentalImageSmall, 'Instrumentale Songs', 'Alles im Zeichen der Instrumente', instrumentalTracks.length, '#522A4C']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 live Songs in den Lieblingssongs sind dann füge sie hinzu
      if(liveTracks.length >= 3){
        colors.push('#EDA543')
        data.push(liveTracks.length)
        labels.push('Live Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/live', liveImageSmall, 'Live Songs', 'Gefühle wie auf einem Konzert', liveTracks.length, '#EDA543']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 Songs mit hoher Energie in den Lieblingssongs sind dann füge sie hinzu
      if(tracksWithHighEnergy.length >= 3){
        colors.push('#CCD691')
        data.push(tracksWithHighEnergy.length)
        labels.push('Energetische Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/highEnergy', highEnergyImageSmall, 'Energetische Songs', '100% Power', tracksWithHighEnergy.length, '#CCD691']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Wenn mehr als 3 Songs mit niedriger Energie in den Lieblingssongs sind dann füge sie hinzu
      if(tracksWithLowEnergy.length >= 3){
        colors.push('#E2CBC3')
        data.push(tracksWithLowEnergy.length)
        labels.push('Ruhige Songs')

        //Setze dass Kategorie als Dashboard Karte angezeigt werden soll
        //Nullte Position = link
        //Erste Position = Bild
        //Zweite Position = Titel
        //Dritte Position = Beschreibung
        //Vierte Position = Anzahl der Tracks in Kategorie, dies wird für die Reihenfolge der Dashbaord Karten gebraucht
        var categorieArray = ['/lowEnergy', lowEnergyImageSmall, 'Ruhige Songs', 'Für entspannte Momente', tracksWithLowEnergy.length, '#E2CBC3']
        //Akustik Array dem overall Array hinzufügen
        trackCategoriesArray.push(categorieArray)
      }
      //Setze die States für die drei verschiedenen Arrays
      setChartColors(colors)
      setChartData(data)
      setChartLabels(labels)

      //trackCategoreisArray nach Anzahl der Songs in jeder Kategorie sortieren
      trackCategoriesArray.sort(function(a, b){
        return a[4] - b[4]
      })
      trackCategoriesArray.reverse()

      //Setze State für die Dashboard Karten
      setTrackCategories(trackCategoriesArray)

      //Nachdem das Kreisdiagramm zusammengebaut wurde und die Dashboard Karten Informationen gesammelt wurden, sind nun alle Informationen vollständig um die Homepage zu rendern
      //Dazu wird das State readyToRender auf true gesetzt
      //Dieser wird an die Komponete Home übergeben
      setReadyToRender(true)
    }
    

  }, [readyToBuildDashboard])


  ///////////// SPOTIFY API FUNKTIONEN ///////////

  //Funktion um einen Nutzer auszuloggen
  const logout = () => {
    //State token wird auf leer gesetzt
    setToken("")
    //token wird aus local storage entfernt
    window.localStorage.removeItem("token");
    //location wird auf die Login Seite gesetzt
    window.location.replace("/");
  }

  //Hole die Profildetails des aktuell eingeloggten Nutzers
  const getCurrentUsersProfile = async () => {

    //Verbindung zur Spotify API
    await fetch('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    }).then(response => response.json())
    .then(data => {
        //Wenn ergebnis da ist dann speichere aktuelle Nutzerinformationen in State
        setCurrentUsersProfile(data)
        setIsLoadingCurrentUsersProfile(false)
    });    
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



  ///////// TRACK FUNKTIONEN ////////

  //Alle drei Favorite Track Kategorien (shortTerm, mediumTerm, longTerm) werden in ein Array gespeichert
  const concatFavoriteTracks = () => {

    //Array konkatinieren
    var allFavoriteTracksArray = favoriteTracksShortTerm.concat(favoriteTracksMediumTerm, favoriteTracksLongTerm)
    //Duplikate entfernen
    var allFavoriteTracksWithoutDuplicates = removeDuplicates(allFavoriteTracksArray)
    //State, welcher alle Favorite Tracks speichert wird gesetzt
    setAllFavoriteTracks(allFavoriteTracksWithoutDuplicates)
    
    //Audio Features Array konkatinieren
    var allFavoriteTracksAudioFeatures = audioFeaturesShortTerm.concat(audioFeaturesMediumTerm, audioFeaturesLongTerm)
    //Duplikate entfernen
    var allFavoriteTracksAudioFeaturesWithoutDuplicates = removeDuplicates(allFavoriteTracksAudioFeatures)
    setAllAudioFeatures(allFavoriteTracksAudioFeaturesWithoutDuplicates)
  }

  //Funktion um duplicate aus Array zu entfernen
  //Kopiert aus Internet
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


  /////// FUNKTIONEN FÜR MUSIKFORSCHUNG //////

  const getAverageValence = (audioFeatures) => {

    var valence = 0

    for(var i=0; i<audioFeatures.length; i++){
      valence = valence + audioFeatures[i].valence
    }
   
    valence = valence / audioFeatures.length;

    setValence(valence)

    console.log("Durchschnittliche Valenz:")
    console.log(valence)

  }

  const getAverageArousal = (audioFeatures) => {

    var arousal = 0

    //Arousal = Energie 

    for(var i=0; i<audioFeatures.length; i++){
      arousal = arousal + audioFeatures[i].energy
    }

    arousal = arousal / audioFeatures.length;

    console.log("Durchschnittliches Arousel:")
    console.log(arousal)

  }


  //Das muss in Tracks rein
  //audioFeaturesShortTerm



  //Tanzbare Songs heraussuchen
  const getDanceableTracks = () => {

    //Iteriere über Audio Features Array
    //Wenn danceibilty über 70% ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array
    //Dann schreibe ID, Songnamen, Artist und Cover-Foto in ein Array
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
      trackInformation.push(allFavoriteTracks[i].album.images[0])

      danceableTracksArray.push(trackInformation)
      }
      
    }
    setDanceableTracks(danceableTracksArray)
  }



  const getTracksWithLowValence = () => {
    //Iteriere über Audio Features Array
    //Wenn Valence unter 0.25 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array

    //Interiere über alle AudioFeatures von allen Tracks
    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      //Wenn ein Tracks weniger Valence als 0.25 hat dann suche den Namen
      //Der Name ist nicht im Audio Featrues Array. Deshalb muss über das favorite Song Array iteriert werden um den Namen zu bekommen
      if(allAudioFeatures[i].valence < 0.25){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      //Hier werden die Informationen zu den Tracks zusammengestellt welche gebraucht werden  
      //Daraus wird im Anschluss ein neues Array gebildet, welches nur die Tracks mit niedriger Valence enthalten
      const trackInformation = []
      //ID des Tracks
      trackInformation.push(allAudioFeatures[i].id)
      //Name des Tracks
      trackInformation.push(trackName)
      //Artist des Tracks
      trackInformation.push(allFavoriteTracks[i].artists)
      //Cover des Tracks
      trackInformation.push(allFavoriteTracks[i].album.images[0])
        
      //Füge diese Informationen ins Array
      tracksWithLowValenceArray.push(trackInformation)
      }
      
    }
    //setze state
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
      const trackInformation = []
      trackInformation.push(allAudioFeatures[i].id)
      trackInformation.push(trackName)
      trackInformation.push(allFavoriteTracks[i].artists)
      trackInformation.push(allFavoriteTracks[i].album.images[0])
    
      tracksWithHighValenceArray.push(trackInformation)
      }
      
    }
    setTracksWithHighValence(tracksWithHighValenceArray)
  }

  const getTracksAcoustic = () => {
    //Iteriere über Audio Features Array
    //Wenn acousticness über 0.7 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array


    //Interiere über alle AudioFeatures von allen Tracks
    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      //Wenn ein Tracks mehr acousticness als 0.7 hat dann suche den Namen
      //Der Name ist nicht im Audio Featrues Array. Deshalb muss über das favorite Song Array iteriert werden um den Namen zu bekommen
      if(allAudioFeatures[i].acousticness > 0.7){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      //Hier werden die Informationen zu den Tracks zusammengestellt welche gebraucht werden  
      //Daraus wird im Anschluss ein neues Array gebildet, welches nur die Tracks mit acousticness über 0.7 enthalten
      const trackInformation = []
      //ID des Tracks
      trackInformation.push(allAudioFeatures[i].id)
      //Name des Tracks
      trackInformation.push(trackName)
      //Artist des Tracks
      trackInformation.push(allFavoriteTracks[i].artists)
      //Cover des Tracks
      trackInformation.push(allFavoriteTracks[i].album.images[0])
        
      //Füge diese Informationen ins Array
      acousticTracksArray.push(trackInformation)
      }
      
    }
    //setze state
    setAcousticTracks(acousticTracksArray)
  }

  const getInstrumentalTracks = () => {
    //Iteriere über Audio Features Array
    //Wenn instrumentalness über 0.9 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array


    //Interiere über alle AudioFeatures von allen Tracks
    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      //Wenn ein Tracks mehr instrumentalness als 0.9 hat dann suche den Namen
      //Der Name ist nicht im Audio Featrues Array. Deshalb muss über das favorite Song Array iteriert werden um den Namen zu bekommen
      if(allAudioFeatures[i].instrumentalness > 0.9){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      //Hier werden die Informationen zu den Tracks zusammengestellt welche gebraucht werden  
      //Daraus wird im Anschluss ein neues Array gebildet, welches nur die Tracks mit instrumentalness über 0.5 enthalten
      const trackInformation = []
      //ID des Tracks
      trackInformation.push(allAudioFeatures[i].id)
      //Name des Tracks
      trackInformation.push(trackName)
      //Artist des Tracks
      trackInformation.push(allFavoriteTracks[i].artists)
      //Cover des Tracks
      trackInformation.push(allFavoriteTracks[i].album.images[0])
        
      //Füge diese Informationen ins Array
      instrumentalTracksArray.push(trackInformation)
      }
      
    }
    //setze state
    setInstrumentalTracks(instrumentalTracksArray)
  }

  const getLiveTracks = () => {
    //Iteriere über Audio Features Array
    //Wenn liveness über 0.8 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array


    //Interiere über alle AudioFeatures von allen Tracks
    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      //Wenn ein Tracks mehr livness als 0.8 hat dann suche den Namen
      //Der Name ist nicht im Audio Featrues Array. Deshalb muss über das favorite Song Array iteriert werden um den Namen zu bekommen
      if(allAudioFeatures[i].liveness > 0.8){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      //Hier werden die Informationen zu den Tracks zusammengestellt welche gebraucht werden  
      //Daraus wird im Anschluss ein neues Array gebildet, welches nur die Tracks mit liveness über 0.8 enthalten
      const trackInformation = []
      //ID des Tracks
      trackInformation.push(allAudioFeatures[i].id)
      //Name des Tracks
      trackInformation.push(trackName)
      //Artist des Tracks
      trackInformation.push(allFavoriteTracks[i].artists)
      //Cover des Tracks
      trackInformation.push(allFavoriteTracks[i].album.images[0])
        
      //Füge diese Informationen ins Array
      liveTracksArray.push(trackInformation)
      }
      
    }
    //setze state
    setLiveTracks(liveTracksArray)
  }

  const getTracksWithHighEnergy = () => {
    //Iteriere über Audio Features Array
    //Wenn energy über 0.8 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array


    //Interiere über alle AudioFeatures von allen Tracks
    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      //Wenn ein Tracks mehr engery als 0.8 hat dann suche den Namen
      //Der Name ist nicht im Audio Featrues Array. Deshalb muss über das favorite Song Array iteriert werden um den Namen zu bekommen
      if(allAudioFeatures[i].energy > 0.8){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      //Hier werden die Informationen zu den Tracks zusammengestellt welche gebraucht werden  
      //Daraus wird im Anschluss ein neues Array gebildet, welches nur die Tracks mit energy über 0.8 enthalten
      const trackInformation = []
      //ID des Tracks
      trackInformation.push(allAudioFeatures[i].id)
      //Name des Tracks
      trackInformation.push(trackName)
      //Artist des Tracks
      trackInformation.push(allFavoriteTracks[i].artists)
      //Cover des Tracks
      trackInformation.push(allFavoriteTracks[i].album.images[0])
        
      //Füge diese Informationen ins Array
      tracksWithHighEnergyArray.push(trackInformation)
      }
      
    }
    //setze state
    setTracksWithHighEnergy(tracksWithHighEnergyArray)
  }

  const getTracksWithLowEnergy = () => {
    //Iteriere über Audio Features Array
    //Wenn energy unter 0.3 ist in neue Liste schreiben
    //Hole dir Songnamen anhand von id aus favertie Tracks Array


    //Interiere über alle AudioFeatures von allen Tracks
    for(var i=0; i < allAudioFeatures.length; i++){

      var trackName = ""

      //Wenn ein Tracks weniger engery als 0.3 hat dann suche den Namen
      //Der Name ist nicht im Audio Featrues Array. Deshalb muss über das favorite Song Array iteriert werden um den Namen zu bekommen
      if(allAudioFeatures[i].energy < 0.4){
        for(var j=0; j < allFavoriteTracks.length; j++){
          if(allAudioFeatures[i].id == allFavoriteTracks[j].id){
            trackName = allFavoriteTracks[j].name
          }
        }
      //Hier werden die Informationen zu den Tracks zusammengestellt welche gebraucht werden  
      //Daraus wird im Anschluss ein neues Array gebildet, welches nur die Tracks mit energy über 0.8 enthalten
      const trackInformation = []
      //ID des Tracks
      trackInformation.push(allAudioFeatures[i].id)
      //Name des Tracks
      trackInformation.push(trackName)
      //Artist des Tracks
      trackInformation.push(allFavoriteTracks[i].artists)
      //Cover des Tracks
      trackInformation.push(allFavoriteTracks[i].album.images[0])
        
      //Füge diese Informationen ins Array
      tracksWithLowEnergyArray.push(trackInformation)
      }
      
    }
    //setze state
    setTracksWithLowEnergy(tracksWithLowEnergyArray)
  }


  /////////  PLAYLIST FUNKTIONEN ///////////

  //erstelle Playliste
  const createPlaylist = (name, tracks, description) => {

    //Token aus lokal storage holen
    var localStorageToken = window.localStorage.getItem('token')

    //Hier noch den Namen dynamisch einbinden
    axios.post('https://api.spotify.com/v1/users/' + currentUsersProfile.display_name + '/playlists', {
      name: name,
      description: description
    }, {
      headers: {
        'Authorization': `Bearer ${localStorageToken}`
      }
    })
    .then(function (response){
      addTracksToPlaylist(response.data.id, tracks)
    })
    .catch(function (error){
      console.log(error)
    })

  }

  //Füge Tracks zu einer Playliste hinzu
  const addTracksToPlaylist = (id, tracks) => {

    //Token aus lokal storage holen
    var localStorageToken = window.localStorage.getItem('token')

    const tracksURIs = tracks.map(track => "spotify:track:" + track[0])

    axios.post('https://api.spotify.com/v1/playlists/' + id + '/tracks', {
      uris: tracksURIs
    }, {
      headers: {
        'Authorization': `Bearer ${localStorageToken}`
      }
    })
    .then(function (response){
      alert("Hey! Playlist wurde erfolgreich erstellt, schaue in deinem Spotify-Profil vorbei, dort wirst du sie finden!")
    })
    .catch(function (error){
      console.log(error)
    })

  }


  //////// VERBINDUNG MIT BACKEND //////////

  const sendDataToBackend = () => {

    var username = "test"
    var valenz = 0.7
    var arousal = 0.1

    axios.post("http://localhost:3001/createEntry", {
      username: username,
      valenz: valenz,
      arousal: arousal
    }).then(function (response){
      alert("Eintrag wurde hinzugeügt")
    })
    .catch(function (error){
      console.log(error)
    })

  }



  return (
    <>
      {/* Wende das Custom Farbschema an */}
      <ThemeProvider theme={theme}>

      {/* Hintergrundfarbe für alle Seiten */}
      <div style={{backgroundColor: "#f6f6f6"}}>
        
      <Router>
        {/* Wenn kein token da ist rendere Login Page
            Wenn ein token vorhanden ist wird automatisch auf die Homepage weitergeleitet
            Wenn ein token da ist rendere AppBar
        */}
        {!token ?
          <>
            <Login _AUTH_ENDPOINT={AUTH_ENDPOINT} _CLIENT_ID={CLIENT_ID} _REDIRECT_URI={REDIRECT_URI} _RESPONSE_TYPE={RESPONSE_TYPE} _scope={scope}></Login>
          </>

        : 
          <>    
            <MyAppBar logout={logout} path={renderState}></MyAppBar>
          </>
        
        }
  
        <Routes>
          <Route path="/home" element={<Home getFavoriteTracksAudioFeaturesShortTerm={getFavoriteTracksAudioFeaturesShortTerm} getFavoriteTracksAudioFeaturesMediumTerm={getFavoriteTracksAudioFeaturesMediumTerm} getFavoriteTracksAudioFeaturesLongTerm={getFavoriteTracksAudioFeaturesLongTerm} getCurrentUsersProfile={getCurrentUsersProfile} currentUsersProfile={currentUsersProfile} token={token} readyToRender={readyToRender} chartColors={chartColors} chartData={chartData} chartLabels={chartLabels} trackCategories={trackCategories} renderState={setRenderState} valenceState={valence}/>}></Route>
          <Route path="/statement" element={<StatementContainer></StatementContainer>}></Route>
          <Route path="/bigFive" element={<BigFive getFavoriteTracksAudioFeaturesShortTerm={getFavoriteTracksAudioFeaturesShortTerm} getFavoriteTracksAudioFeaturesMediumTerm={getFavoriteTracksAudioFeaturesMediumTerm} getFavoriteTracksAudioFeaturesLongTerm={getFavoriteTracksAudioFeaturesLongTerm} getCurrentUsersProfile={getCurrentUsersProfile} currentUsersProfile={currentUsersProfile} token={token} readyToRender={readyToRender} chartColors={chartColors} chartData={chartData} chartLabels={chartLabels} trackCategories={trackCategories} renderState={setRenderState} valenceState={valence}/>}></Route>   
          <Route path="/danceable" element={<Danceable danceableTracks={danceableTracks} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route> 
          <Route path="/lowValence" element={<LowValence tracksWithLowValence={tracksWithLowValence} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route> 
          <Route path="/highValence" element={<HighValence tracksWithHighValence={tracksWithHighValence} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route>
          <Route path="/acoustic" element={<Acoustic acousticTracks={acousticTracks} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route>
          <Route path="/instrumental" element={<Instrumental instrumentalTracks={instrumentalTracks} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route> 
          <Route path="/live" element={<Live liveTracks={liveTracks} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route>
          <Route path="/highEnergy" element={<HighEnergy tracksWithHighEnergy={tracksWithHighEnergy} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route>
          <Route path="/lowEnergy" element={<LowEnergy tracksWithLowEnergy={tracksWithLowEnergy} createPlaylist={createPlaylist} renderState={setRenderState}/>}></Route>               
        </Routes> 


      </Router>

      </div>

      </ThemeProvider>
  

      <Helmet>
          <title>Spotify Taste Analyzer</title>
          
    </Helmet>
    </>
  );
}

export default App;
