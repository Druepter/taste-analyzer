import React, {useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PieChart from "./PieChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardCards from './DashboardCards'
import { CSVLink, CSVDownload } from "react-csv";


ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, getCurrentUsersProfile, currentUsersProfile, token, readyToRender, chartColors, chartData, chartLabels, trackCategories, renderState, valenceState}){
    
    //Beim rendern dieser Seite wird die Location auf home gesetzt
    useEffect(() => {
        renderState('home')
    }, [])


    //Wenn ein token da ist dann lade lieblingssongs von Spotify APÌ
    useEffect(() => {
        //Es wird gewartet bis der Token geladen ist
        //Dann ist die Anwendung bereit für Abfragen
        //Wenn der token nicht leer ist dann starte abfragen
        if(token == ""){

        }
        else{
            //Alle Lieblingssongs werden geholt
            //Über die use Effekt Methoden von App.js werden die weiteren Abfragen verarbeitet
            getFavoriteTracksAudioFeaturesShortTerm()
            getFavoriteTracksAudioFeaturesMediumTerm()
            getFavoriteTracksAudioFeaturesLongTerm()
            getCurrentUsersProfile()
        }     
    }, [token])

    return (
        <>
          {/* Wenn readyToRender true ist dann lade Dashboard
              Solange readyToRender nicht true ist dann zeige Loadingspinner an
          */}
          {readyToRender ?
                      <>
                      <Container sx={{boxShadow: 1}} style={{backgroundColor: "white", paddingTop: 6}} maxWidth="md">
                        <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
                            Herzlich Willkommen, {currentUsersProfile.display_name}
                        </Typography>

                        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                          Wir haben erfolgreich analysiert welche Merkmale deine Lieblingssongs am besten beschreiben!
                          Dazu haben wir uns deine meistgehörten Songs der letzten vier Wochen, der letzten sechs Monate und 
                          der vergangenen Jahre, seit dem du auf Spotify aktiv bist, angeschaut und diese nach verschiedenen
                          Eigenschaften kategorisiert.
                        </Typography>

                        <Typography variant="h4" sx={{mb: 2, mt: 4, fontWeight: 550, fontSize: 30}}>
                            Deine Top-Kategorien:
                        </Typography>

                        <PieChart chartColors={chartColors} chartData={chartData} chartLabels={chartLabels} trackCategories={trackCategories}></PieChart>

                        <Typography variant="h4" sx={{mb: 2, mt: 4, fontWeight: 550, fontSize: 30}}>
                            Playlisten:
                        </Typography>

                        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                          Hier findest du von uns erstellte Paylisten zu deinen Top-Kategorien. Tipp: Wenn du auf einer der Kategorieseiten
                          nach ganz unten scrollst findest du einen Button, mit welchem du die Playlist in dein Spotify-Profil übertragen kannst!
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <DashboardCards trackCategories={trackCategories}></DashboardCards>
                        </Grid>

                        <CSVLink data={String(valenceState)}>Download me</CSVLink>;



                    </Container>


              </>
            :
            <>
              <Container sx={{boxShadow: 1}} style={{backgroundColor: "white", paddingTop: 1}} maxWidth="md">
                <Grid container sapcing={0}  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',}}>
                  <Grid item>
                    <CircularProgress size="10rem" />
                  </Grid>
                </Grid>
              </Container>
            </>

          }
        </>
    )
}

