import { root } from "postcss";
import React, {useEffect, useState} from "react";
import UserName from "./userName";
import DashboardCard from "./dashboardCard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Danceable from "./danceable";
import image from "./assets/Download.png"
import discoImageSmall from "./assets/disco_klein.png"
import CardMedia from '@mui/material/CardMedia';
import traurigImage from "./assets/traurig.jpg"
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



export default function Home({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, getCurrentUsersProfile, token, readyToRender}){
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);


    useEffect(() => {

            //getFavoriteTracksAudioFeaturesShortTerm()
            //getFavoriteTracksAudioFeaturesMediumTerm()
            //getFavoriteTracksAudioFeaturesLongTerm()


            //concatFavoriteTracks()
            //getAudioFeatures()
        

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
                            Willkommen beim Taste Analyzer
                        </Typography>
                        <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                          Wir haben deine Liebliegssongs analysiert und diese für dich Kategorisiert.
                          Du brauchst einen Song für eine bestimmte Stimmung?
                          Hast Lust zu deine Liebliegssongs zu tanzen?
                          Alles kein Problem. Wir haben diese für dich in verschiedenen Playlisten zusammengestellt.
                          Tipp: Wenn du auf einer Seite herunterscrollst wirst du einen Button finden der eine Playlist auf deinem
                          Spotify Profil erstellt.
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4} sm={6}>
                            <DashboardCard link='/danceable' image={discoImageSmall} title='Songs zum tanzen' description='Deine tanzenbaren Songs'></DashboardCard>
                          </Grid>
                          <Grid item xs={12} md={4} sm={6}>
                            <DashboardCard link='/lowValence' image={traurigImage} title='Traurige Songs' description='Deine traurigen Songs'></DashboardCard>
                          </Grid>
                          <Grid item xs={12} md={4} sm={6}>
                            <DashboardCard link='/highValence' image={discoImageSmall} title='Fröhliche Songs' description='Hier deine fröhlichen Songs'></DashboardCard>
                          </Grid>
                        </Grid>
                    </Container>


              </>
            :
            <>
                            <Container sx={{boxShadow: 1}} style={{backgroundColor: "white", paddingTop: 1}} maxWidth="md">
                <Grid container sapcing={0} align="center" justify="center" direction="column">
                  <Grid item>
                    <CircularProgress />
                  </Grid>


                </Grid>
                
                
                {/*<Box sx={{display: 'flex', margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                  <CircularProgress />
        </Box>*/}

              </Container>
            </>

          }






                
          

        </>
    )
}

