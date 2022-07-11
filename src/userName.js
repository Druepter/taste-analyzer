import React, { useState, useEffect} from "react";
import FavoriteTracks from "./favoriteTracks";





export default function UserName(){

    useEffect(() => {
        fetchData()
    }, [])
    
    
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState()
    
    const fetchData = async () => {
      setIsLoading(true);
      
    
      var localStorageToken = window.localStorage.getItem('token')
    
      await fetch('https://api.spotify.com/v1/me', {
        method: 'get',
        headers: new Headers({
          'Authorization': `Bearer ${localStorageToken}`
        })
      }).then(response => response.json())
      .then(data => {
        setUserName(data)
        setIsLoading(false)
      });
    
    }

    return (
        <>
            {isLoading ?
                <div>Name wird geladen</div>
            :
                <span>{userName.display_name}</span>
            }
        </>
    )}