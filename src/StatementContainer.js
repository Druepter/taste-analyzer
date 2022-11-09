import React, {useState, useEffect} from "react";
import Statement from "./Statement";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

export default function StatementContainer(){

    //Map, welche alle Statements in Textform und als Nummer beinhaltet
    const statementMap = new Map();
    statementMap.set(1, 'Ich bin ehr zurückhaltend, reserviert.')
    statementMap.set(2, 'Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen.')
    statementMap.set(3, 'Ich bin bequem, neige zur Faulheit.')
    statementMap.set(4, 'Ich bin entspannt, lasse mich durch Stress nicht aus der Ruhe bringen.')
    statementMap.set(5, 'Ich habe nur wenig künstlerisches Interesse.')
    statementMap.set(6, 'Ich gehe aus mir heraus, bin gesellig.')
    statementMap.set(7, 'Ich neige dazu, andere zu kritisieren.')
    statementMap.set(8, 'Ich erledige Aufgaben gründlich.')
    statementMap.set(9, 'Ich werde leicht nervös und unsicher.')
    statementMap.set(10, 'Ich habe eine aktive Vorstellungskraft, bin fantasievoll.')



    //Map, welche die Nummern der Statementes und die Nummern der Auswahl des Nutzers beeinhaltet
    //key = Statement Nummer
    //value = auswahl welche der Nutzer getroffen hat
    const [statementSelectionMap, setStatementSelectionMap] = useState(new Map())

    //Wenn sich diese States ändern. verändert sich die Seite
    const [statementDescription, setStatementDescription] = useState(statementMap.get(1))
    const [statementNumber, setStatementNumber] = useState(1)
    const [allStatementsDone, setAllStatementsDone] = useState(false)


    const increaseStatementNumber = () => {
      if(statementNumber < statementMap.size){
        setStatementNumber(statementNumber + 1)
      }
      else{
        console.log("jetzt andere Seite")
        setAllStatementsDone(true)
      }
      
    }

    const matchStatementDescriptionToStatementNumer = () => {
      setStatementDescription(statementMap.get(statementNumber))
    }

    //Füge der Selection Map einen Eintrag hinzu
    const addEntryToStatementSelectionMap = (number, selection) => {
      setStatementSelectionMap(statementSelectionMap.set(number, selection))
    }

    const calculateBigFive = () => {

      


    }


    //Einige Statements sind negative Fragen. Diese müssen zu nächst recodiert werden
    const recodeStatements = () => {
      statementSelectionMap.forEach((key, value) => {
        //All diese Statements müssen recodiert werden
        if(key == 1 || key == 3 || key == 4 || key == 5 || key == 7){
          if(value == 1) {
            statementSelectionMap.set(key, 5)
          }
          else if(value == 2){
            statementSelectionMap.set(key, 4)
          }
          else if(value == 4){
            statementSelectionMap.set(key, 2)
          }
          else if(value == 5){
            statementSelectionMap.set(key, 1)
          }
        }    
      })
      console.log(statementSelectionMap)

      

    }

    useEffect(() => {
      //Wenn statementNumber sich ändert setzte auch statementDescription neu
      matchStatementDescriptionToStatementNumer()
    }, [statementNumber])

    useEffect(() => {
      recodeStatements()
    }, [allStatementsDone])


    return (
        <>
          <Container sx={{boxShadow: 1}} style={{backgroundColor: "white", paddingTop: 6}} maxWidth="md">
            {allStatementsDone == false ?
              <Statement description={statementDescription} number={statementNumber} increaseStatementNumber={increaseStatementNumber} addEntryToStatementSelectionMap={addEntryToStatementSelectionMap}></Statement>
            :
              <>
                <Typography sx={{mb: 2, mt: 2, fontSize: 15}}>
                  Alle Fragen sind beantwortet. Klicke auf den Button Ergebnisse anschicken um die Umfrage zu beenden.
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx = {{paddingTop: 2, paddingBottom: 2}}
                >
                  <Button variant="contained" size="large">Ergebnisse senden</Button>
                </Box>
              </>

            }
          </Container>     
        </>
    )       




}