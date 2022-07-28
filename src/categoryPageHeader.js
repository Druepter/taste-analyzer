import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import image from "./assets/Download.png"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import discoImage from "./assets/disco.jpg"
import discoImageSmall from "./assets/disco_klein.png"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



export default function CategoryPageHeader(){


    return (
        <>
            <ImageList cols={1} sx={{marginLeft: "-24px", marginRight: "-24px", marginTop: "-10px"}}>
                <ImageListItem>
                    <img
                        src={`${discoImageSmall}?w=500&fit=crop&auto=format`}
                        srcSet={`${discoImageSmall}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt="Huhu"
                        loading="lazy"
                        sx={{marginLeft: "-30px"}}
                    />
                    {/*<ImageListItemBar
                        sx={{
                            background: 'none'
                        }}
                        title="Du tanzt gerne"
                        //subtitle="Die Tanzbaren Songs sind hier"
                    />*/}
                </ImageListItem>                
            </ImageList>
            <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
                Deine Tanzbaren Songs
            </Typography>
            <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                In deinen Lieblingssongs finden sich einige Lieder zu denen sich super das Tanzbein schwingen lässt:
            </Typography>
        </>
    )
}