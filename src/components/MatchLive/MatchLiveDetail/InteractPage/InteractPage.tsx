import React, { useEffect, useRef, useState } from "react";


  
interface Score {
    team_a_score: number;
    team_b_score: number;
}

const InteractPage = ({ matchID }: { matchID: number}) => {
    const [score, setScore] = useState<Score>({ team_a_score: 0, team_b_score: 0 });
    const [connected, setConnected] = useState<boolean>(false)
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(
            `ws://localhost:8081/ws?role=interact&matchID=${matchID}`
        );

        socketRef.current.onopen = () => {
            console.log("Connected to WebSocket in Interact mode");
            setConnected(true)
        };

        socketRef.current.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            setScore({
                team_a_score: data.team_a_score,
                team_b_score: data.team_b_score,
            });
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket closed in Interact mode");
            setConnected(false)
        };

        return () => {
            socketRef.current?.close();
        };
    }, [matchID]);

    const sendMessage = (operation: string, team: string) => {
    if (socketRef.current) {
        socketRef.current.send(
            JSON.stringify({
                operation,
                team,
            })
        );
    }
    };

    return (
    <div>
        <h3>Interacting with Match {matchID}</h3>
        {
            connected?<p>Connected</p>:<p>Not Connected</p>
        }
        <p>Team A Score: {score.team_a_score}</p>
        <p>Team B Score: {score.team_b_score}</p>
        <button onClick={() => sendMessage("add", "A")}>Add Point to Team A</button>
        <button onClick={() => sendMessage("remove", "A")}>Remove Point from Team A</button>
        <button onClick={() => sendMessage("add", "B")}>Add Point to Team B</button>
        <button onClick={() => sendMessage("remove", "B")}>Remove Point from Team B</button>
    </div>
    );
};

export default InteractPage