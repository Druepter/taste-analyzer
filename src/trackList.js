import React from "react";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from "@mui/material";


export default function TrackList({tracks}){

    const [dense, setDense] = React.useState(false);

    const renderTracksMUI = () => {
        return tracks.map(track =>(
            <>
                {track != tracks[0] ?
                    <Divider variant="middle" component="li" ></Divider>
                    :
                    <></>
                }
                
                <ListItem key={track[0]}>
                  <ListItemButton component="a" href={'https://open.spotify.com/track/' + track[0]} target="_blank"> 
                    <ListItemAvatar>
                        <Avatar alt={track[2][0]} variant="square" src={track[3].url} />
                    </ListItemAvatar> 
                    <ListItemText
                        primary={track[1]}
                        secondary={renderArtists(track[2])}
                    />
                    </ListItemButton> 
                </ListItem>

            </>
        ))
    }

    const renderArtists = (artists) => {
        //Wenn es mehr als ein Artist sind dann füge Komma dazwischen
        return artists.map((artist, i, {length}) => (
            <span>
                {length - 1 === i ?
                    <span>{artist.name.toString()}</span>
                :
                    <span>{artist.name.toString()}, </span>    
                }
            </span>
        ))                  
    }

    return (
        <>
         <Grid item xs={12} md={6}>        
            <List dense={dense}>
                {renderTracksMUI()}
            </List>
         </Grid>
        </>
    )}