import React, { useState, useEffect} from "react";


export default function FavoriteTracks(){

    useEffect(() => {
        fetchData()
    }, [])
    
    
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteTracks, setFavoriteTracks] = useState()
    
    const fetchData = async () => {
      setIsLoading(true);
      
      var localStorageToken = window.localStorage.getItem('token')
      console.log(window.localStorage.getItem('token'));
    
      await fetch('https://api.spotify.com/v1/me/top/tracks/?limit=50&time_range=medium_term', {
        method: 'get',
        headers: new Headers({
          'Authorization': `Bearer ${localStorageToken}`
        })
      }).then(response => response.json())
      .then(data => {
        setFavoriteTracks(data)
        setIsLoading(false)
      });
    
    }

    return(
      favoriteTracks
    )


    return (
        <>
            {isLoading ?
                <div>Name wird geladen</div>
            :
                <span></span>
            }
        </>
    )}