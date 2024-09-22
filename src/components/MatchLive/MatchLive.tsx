import React, { useEffect, useState } from "react"
import { getMatchLive } from "../../api/matches"
import { Match } from "../../interfaces/matches";

const MatchLive = () => {
    const [match, setMatch] = useState<Match | null>(null)
    const [error, setError] = useState<string | null>(null); 
    useEffect(()=>{
        const fetchMatchLive = async () =>{
            try{
                const response = await getMatchLive()
                setMatch(response)
            }catch (err) {
                setError('Error fetching match details');
                console.error(err);
            } 
        }
        fetchMatchLive()
    }, [])
    return(
        match? 
        <h1>{match.adversary}</h1>
        :error?
        <p>{error}</p>:
        <p>No match found</p>
    )
}

export default MatchLive