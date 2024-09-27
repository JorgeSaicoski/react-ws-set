import React, { useEffect, useState, useRef } from "react";



interface ScoreUpdate {
  team_a_score: number;
  team_b_score: number;
}

const WatchPage = ({ matchID }: { matchID: number}) => {
  const [score, setScore] = useState<ScoreUpdate | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(
      `ws://localhost:8081/ws?role=watch&matchID=${matchID}`
    );

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket in Watch mode");
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(event)
      console.log(data)

      if (data.team_a_score !== undefined && data.team_b_score !== undefined) {
        setScore({
          team_a_score: data.team_a_score,
          team_b_score: data.team_b_score,
        });
      } else {
        console.log("Message received: ", data);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket closed in Watch mode");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [matchID]);

  return (
    <div>
      <h3>Watching Match {matchID}</h3>

      {score ? (
        <div>
          <p>Team A Score: {score.team_a_score}</p>
          <p>Team B Score: {score.team_b_score}</p>
        </div>
      ) : (
        <p>Waiting for score updates...</p>
      )}
    </div>
  );
};

export default WatchPage;
