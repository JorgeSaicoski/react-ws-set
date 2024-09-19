// src/components/MatchList.tsx
import { useEffect, useState } from 'react';
import { Match } from '../../interfaces/matches';
import { getMatches } from '../../api/matches';

interface MatchListProps {
  onSelectMatch: (id: number) => void;
}

const MatchList = ({ onSelectMatch }: MatchListProps) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await getMatches();
        setMatches(response?.data ?? []);
      } catch (err) {
        setError('There was an error fetching the matches');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map(match => (
          <li key={match.ID} onClick={() => onSelectMatch(match.ID)}>
            {match.Adversary} {new Date(match.MatchDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;

