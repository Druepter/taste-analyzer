
export default function TrackList({tracks}){

    const renderTracks = () => {
        return tracks.map(track =>(
            <>
                <div key={track[0]}>
                    <span>{track[1]} - </span>
                    <span>{renderArtists(track[2])}</span>
                </div>
            </>
        ))
    }

    const renderArtists = (artists) => {
        return artists.map(artist =>(
           <span>
                {artist.name.toString()}
           </span> 
        ))
            
    }

    return (
        <>
          <div>{renderTracks()}</div>
        </>
    )}