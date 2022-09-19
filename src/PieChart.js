import { Doughnut } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';
import {useNavigate} from 'react-router-dom';

//Funktion erstellt Kreisdiagramm
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
    plugins:{
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14
          },
        },
        onClick: (e, elements) => {
          //Tue nichts
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        intersect: false,
        mode: 'index',
        callbacks: {
          labelTextColor: function(){
            return '#000000'
          },
        },
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    
    <Box
    sx={{
      height: 350,
      position: 'relative'
    }}
  >
    <Doughnut
      data={data}
      options={options}
    />
  </Box>
  );
};