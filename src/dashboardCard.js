import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import discoImageSmall from "./assets/disco_klein.png"



export default function DashboardCard({link, image, title, description}){
    return(
        <>
        <Card sx={{boxShadow: 'none'}}>
            <CardActionArea component={RouterLink} to={link}>
            <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {description}
                </Typography>
            </CardContent>  
            {/*<CardActions>
                <Button size="small">Jetzt ansehen</Button>
                </CardActions>*/}
            </CardActionArea>
        </Card>        
        </>
    )

}