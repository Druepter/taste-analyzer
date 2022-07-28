import React, {useState} from "react";


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
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



    const renderTracks = () => {
        return tracks.map(track =>(
            <>
                <div key={track[0]}>
                    <span>{track[1]} - </span>
                    <span>{renderArtists(track[2])}</span>
                    <img src={track[3].url} width="30px"></img>
                </div>
            </>
        ))
    }

    const renderArtists = (artists) => {
        return artists.map(artist =>(
           <span>
                {artist.name.toString()}
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




         {/**<div>{renderTracks()}</div>**/}
        </>
    )}