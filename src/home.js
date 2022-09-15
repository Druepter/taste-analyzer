import { root } from "postcss";
import React, {useEffect, useState} from "react";
import UserName from "./userName";
import DashboardCard from "./dashboardCard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Danceable from "./danceable";
import image from "./assets/Download.png"
import discoImageSmall from "./assets/disco_klein.png"
import danceableImageSmall from "./assets/tanzbar_klein.jpg"
import CardMedia from '@mui/material/CardMedia';
import lowValenceImageSmall from "./assets/traurig_klein.jpg"
import highValenceImageSmall from "./assets/gluecklich_klein.jpg";
import acousticImageSmall from "./assets/akustik_klein.jpg";
import instrumentalImageSmall from "./assets/instrumental_klein.jpg";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import AppCurrentVisits from "./PieChart";
import TrafficByDevice from "./traffic-by-device";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardCards from './DashboardCards'

ChartJS.register(ArcElement, Tooltip, Legend);



function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  })); 



export default function Home({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, getCurrentUsersProfile, token, readyToRender, chartColors, chartData, chartLabels, trackCategories, renderState}){
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);


    useEffect(() => {

            //getFavoriteTracksAudioFeaturesShortTerm()
            //getFavoriteTracksAudioFeaturesMediumTerm()
            //getFavoriteTracksAudioFeaturesLongTerm()


            //concatFavoriteTracks()
            //getAudioFeatures()
            renderState('home')

    }, [])


    useEffect(() => {
      console.log(readyToRender)
    }, [readyToRender])

    useEffect(() => {
        //Es wird gewartet bis der Token geladen ist
        //Dann ist die Anwendung bereit für Abfragen
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
          {readyToRender ?
                      <>
                      <Container sx={{boxShadow: 1}} style={{backgroundColor: "white", paddingTop: 6}} maxWidth="md">
                        <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
                            Herzlich Willkommen
                        </Typography>

                        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                          Du bracuhst eine Playlist bestehend aus deinen Lieblingssongs für eine bestimmte Stimmung?
                          Nach Eigenschaften sortiert
                          Wir haben deine Lieblingssongs erfolgreich analysiert und daraus ein Profil
                          für deinen Musikgeschmack erstellt. Dazu haben wir deine meinstgespielten Tracks
                          nach verschiedenen Kriterien kategorisiert. In dem nun folgenden Kreisdiagramm
                          siehst du welche Kategorien du am meisten hörst. Weiter unten auf dieser Seite sind
                          die einzelnen Kategorien mit Songs aufgeführt. Tipp: Wenn du auf einer Kategorieseite
                          herunterscrollst findest du einen Button um eine Playlist zu erstellen!
                        </Typography>

                        <Typography variant="h4" sx={{mb: 2, mt: 4, fontWeight: 550, fontSize: 30}}>
                            Deine Top Kategorien:
                        </Typography>

                        <TrafficByDevice chartColors={chartColors} chartData={chartData} chartLabels={chartLabels} trackCategories={trackCategories}></TrafficByDevice>

                        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                          In den folgenden Kacheln sind die Songs aufgeteilt in Playlisten zu sehen
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <DashboardCards trackCategories={trackCategories}></DashboardCards>
                        </Grid>
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

