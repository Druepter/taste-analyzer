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
import DashboardCard from "./dashboardCard";


export default function DashboardCards({trackCategories}){

    return trackCategories.map(categorie =>(
        <>  
            <Grid item xs={12} md={4} sm={6}>
                <DashboardCard link={categorie[0]} image={categorie[1]} title={categorie[2]} description={categorie[3]}></DashboardCard>
            </Grid>
        </>
    ))}