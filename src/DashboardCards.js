import React from "react";
import Grid from '@mui/material/Grid';

import DashboardCard from "./DashboardCard";

//Diese Funktion erstellt das Grid System im welchem alle Dashboard Karten drin sind
export default function DashboardCards({trackCategories}){

    return trackCategories.map(categorie =>(
        <>  
            <Grid item xs={12} md={4} sm={6} key={categorie[2]}>
                <DashboardCard link={categorie[0]} image={categorie[1]} title={categorie[2]} description={categorie[3]}></DashboardCard>
            </Grid>
        </>
    ))}