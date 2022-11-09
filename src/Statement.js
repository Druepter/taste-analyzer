import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Statement({description, number, increaseStatementNumber, addEntryToStatementSelectionMap}){

    useEffect(() => {
      }, [])

    const handleOnClick = (selection) =>{
        addEntryToStatementSelectionMap(number, selection)
        increaseStatementNumber()
    }

    return (
        <>
            <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                {description}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 2, paddingBottom: 2}}
            >
              <Button onClick={() => handleOnClick(1)} variant="contained" size="large">Trifft überhaupt nicht zu</Button>         
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 2, paddingBottom: 2}}
            >
                <Button onClick={() => handleOnClick(2)} variant="contained" size="large">Trifft ehr nicht zu</Button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 2, paddingBottom: 2}}
            >
                <Button onClick={() => handleOnClick(3)} variant="contained" size="large">Weder noch</Button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 2, paddingBottom: 2}}
            >
                <Button onClick={() => handleOnClick(4)} variant="contained" size="large">Ehr zutreffend</Button>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx = {{paddingTop: 2, paddingBottom: 2}}
            >
                <Button onClick={() => handleOnClick(5)} variant="contained" size="large">Trifft voll und ganz zu</Button>
            </Box>
            
        </>
    )       




}