import { root } from "postcss";
import React, {useEffect, useState} from "react";
import UserName from "./userName";
import DashboardCard from "./dashboardCard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Danceable from "./danceable";
import image from "./assets/Download.png"
import discoImageSmall from "./assets/disco_klein.png"
import CardMedia from '@mui/material/CardMedia';


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



export default function Home({getFavoriteTracksAudioFeaturesShortTerm, getFavoriteTracksAudioFeaturesMediumTerm, getFavoriteTracksAudioFeaturesLongTerm, getCurrentUsersProfile, token}){
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
                  <Card sx={{boxShadow: 'none'}}>
                  <CardActionArea component={RouterLink} to="/danceable">
                  <CardMedia
                    component="img"
                    height="140"
                    image={discoImageSmall}
                    alt="green iguana"
                  />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tanzebare Songs
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sieh dir deine Songs an, welche sich perfekt für die nächste Party eignen!
                        Damit bekommst du jeden auf die Tanzfläche!
                      </Typography>
                    </CardContent>  
                    {/*<CardActions>
                      <Button size="small">Jetzt ansehen</Button>
                      </CardActions>*/}
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <DashboardCard link='/danceable' image={discoImageSmall} title='Tanzbare Songs' description='Hier deine tanzbaren Songs'></DashboardCard>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <DashboardCard link='/danceable' image={discoImageSmall} title='Tanzbare Songs' description='Hier deine tanzbaren Songs'></DashboardCard>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                  <DashboardCard link='/danceable' image={discoImageSmall} title='Tanzbare Songs' description='Hier deine tanzbaren Songs'></DashboardCard>
                </Grid>
              </Grid>
            </Container>



                
          

        </>
    )
}

