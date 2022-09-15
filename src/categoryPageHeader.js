import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function CategoryPageHeader({image, title, description}){
    return (
        <>

            <Container style={{backgroundColor: "white", padding: 0}} maxWidth="md">
                <ImageList cols={1} sx={{marginTop: "-10px"}}>
                    <ImageListItem>
                        <img
                            src={`${image}?w=500&fit=crop&auto=format`}
                            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={title}
                            loading="loading"
                            sx={{marginLeft: "-30px"}}
                        />
                    </ImageListItem>                
                </ImageList>
            </Container>

            <Container style={{backgroundColor: "white"}} maxWidth="md">
                <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
                    {title}
                </Typography>
                <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                    {description}
                </Typography>
            </Container>    
        </>
    )
}