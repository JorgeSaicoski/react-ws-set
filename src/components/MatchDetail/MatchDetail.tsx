import React, { useEffect, useState } from "react";

import { Match } from '../../interfaces/matches';
import { getMatchesByID } from "../../api/matches";

interface MatchDetailProps {
  matchID: number | null; 
}

const MatchDetail = ({ matchID }: MatchDetailProps) => {
    const [match, setMatch] = useState<Match | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 
  
    useEffect(() => {
      if (matchID === null) return; 
  
      const fetchMatchDetails = async () => {
        setLoading(true);
        try {
          const response = await getMatchesByID(matchID); 
          setMatch(response.data); 
        } catch (err) {
          setError('Error fetching match details');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMatchDetails();
    }, [matchID]); 

    if (loading) return <div>Loading match details...</div>;
    if (error) return <div>{error}</div>;
    if (!match) return <div>Please select a match to see the details</div>;
  
    return (
      <div>
        <h3>Match Details</h3>
        <p><strong>Adversary:</strong> {match.adversary}</p>
        <p><strong>Date:</strong> {new Date(match.matchDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {match.isLive ? 'Live' : 'Finished'}</p>
        <p><strong>Result:</strong> {match.win ? 'Won' : 'Lost'}</p>
  
        <h4>Set Details</h4>
        <ul>
          {match.sets.map((set) => (
            <li key={set.id}>
              Set {set.id}: {set.scoreTeamA} - {set.scoreTeamB} {set.win ? '(Win)' : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MatchDetail;