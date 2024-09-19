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
        <p><strong>Adversary:</strong> {match.Adversary}</p>
        <p><strong>Date:</strong> {new Date(match.MatchDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {match.IsLive ? 'Live' : 'Finished'}</p>
        <p><strong>Result:</strong> {match.Win ? 'Won' : 'Lost'}</p>
  
        <h4>Set Details</h4>
        <ul>
          {match.Sets.map((set) => (
            <li key={set.ID}>
              Set {set.ID}: {set.ScoreTeamA} - {set.ScoreTeamB} {set.Win ? '(Win)' : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MatchDetail;