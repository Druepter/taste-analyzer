import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

export default function CategoryPageHeader({image, title, description}){
    return (
        <>
            <ImageList cols={1} sx={{marginLeft: "-24px", marginRight: "-24px", marginTop: "-10px"}}>
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
            <Typography variant="h3" sx={{mb: 2, mt: 4, fontWeight: 550}}>
                {title}
            </Typography>
            <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                {description}
            </Typography>
        </>
    )
}