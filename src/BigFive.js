import React, {useState, useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PieChart from "./PieChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardCards from './DashboardCards'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
//import { CSVLink, CSVDownload } from "react-csv";


ChartJS.register(ArcElement, Tooltip, Legend);


export default function BigFive({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, getCurrentUsersProfile, currentUsersProfile, token, readyToRender, chartColors, chartData, chartLabels, trackCategories, renderState, valenceState}){
    
    const [item, setItem] = useState("start")



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
                            Dir werden im folgenden 10 Fragen gezeigt, welche Persönlichkeiten beschreiben.
                            Es gibt sieben Auswahlmöglichkeiten.
                            Beantworte die Fragen bestmöglich.
                          </Typography>

                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx = {{paddingTop: 4, paddingBottom: 5}}
                          >
                            <Button variant="contained" size="large">Beginnen</Button>
                          </Box>

                        


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

