import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import {useNavigate} from 'react-router-dom';



export default function PieChart({chartColors, chartData, chartLabels, trackCategories}){

//export const TrafficByDevice = (props, test) => {
  const theme = useTheme();

  var dataTest = []
  var colors = []
  var labels = []

  for(var i=0; i < trackCategories.length; i++){
    dataTest.push(trackCategories[i][4])
    colors.push(trackCategories[i][5])
    labels.push(trackCategories[i][2])
  }

  const data = {
    datasets: [
      {
        data: dataTest,
        backgroundColor: colors,
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: labels
  };

  const navigate = useNavigate();

  const options = {
    onClick: (e, elements) => {
      //Wenn auf ein Element im PieChart geklickt wird dann gehe auf die dazugehörige Seite
      //Dazu nutze navigate Funktion des react router doms
      //und den Link aus den trackCategoreis
      //Nullte Stelle ist der Link
      navigate(trackCategories[elements[0].element.$context.dataIndex][0], {replace: true})

    },
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    /*tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }*/
  };


  const devices = [
    {
      title: 'Desktop',
      value: 63,
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Tablet',
      value: 15,
      icon: TabletIcon,
      color: '#E53935'
    },
    {
      title: 'Mobile',
      value: 23,
      icon: PhoneIcon,
      color: '#FB8C00'
    }
  ];

  return (
    
    <Box
    sx={{
      height: 300,
      position: 'relative'
    }}
  >
    <Doughnut
      data={data}
      options={options}
    />
  </Box>

    /*<Card>
      <CardHeader title='huhu' />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>*/
  );
};