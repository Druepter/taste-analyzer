import { root } from "postcss";
import React, {useEffect, useState} from "react";





export default function Home({getCurrentUsersProfile, currentUsersProfile}){


    //Wenn Daten noch nicht da sind zeige andere Seite
    //Wenn Daten da sind dann Lade richtige Seite
    //Speichere Daten in Liste

    const [reloadState, setReloadState] = useState("")
    


    var status = "geladen";
    var data;


    const [isLoading, setIsLoading] = useState();
    const [myData, setMyData] = useState();


    useEffect(() => {
        //Bei Pageload einmal
        //Hole alle Daten

        setIsLoading(true);

        data = getCurrentUsersProfile()


        data.then(
            function(value) {
                setIsLoading(false)
                setMyData(data)
            },
            function(error) {
                
            }
        );

  

        /*if(!data){
            data = getCurrentUsersProfile()

            data.then(
                function(value) {
                    console.log(value) 
                    status="geladen"
                    setReloadState("huhu");
                    
                },
                //Wenn value zeige die originale Seite
                //Wenn error dann zeige die ersatz Seite
                function(error) {
                    console.log(error)
                    status="error"
                }
            );


        }*/

    })



    //if Daten geladen return ..



    //Sonst return was anders

    if(status == "geladen"){
        return (
            <>
                <div>Daten sind geladen</div>
                <div>{data}</div>
            </>
        )
    }
    else{
        return (
            <>
                <div>Daten werden geladen</div>
            </>
        )
    }

    return (

        //Hier einbauen Variale 
    

        <div>
            Hallo, hier Name der Person
            <br></br>
            <button>Weiter zur nächten Seite</button>

            
        </div>

    )
}

function MeinButton(){
    return(
        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
            <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"> Get started Now</a>
            </div>
        </div>
    )
  }