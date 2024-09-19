import React, { useState } from 'react';
import MatchList from './components/MatchList/MatchList';
import MatchDetail from './components/MatchDetail/MatchDetail';

const App = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const handleSelectMatch = (id: number) => {
    setSelectedMatchId(id || null);
  };

  return (
    <div>
      <h1>Match Viewer</h1>
      <MatchList onSelectMatch={handleSelectMatch} />
      <MatchDetail matchID={selectedMatchId} />
    </div>
  );
};

export default App;
