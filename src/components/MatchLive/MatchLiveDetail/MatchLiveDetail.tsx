import React, { useState, useEffect } from "react";

interface Message {
  operation: string;
  team: string;
}

const WEBSOCKET_URL = 'ws://localhost:8081/ws?role=interact';

const MatchLiveDetail = () => {
  const [operation, setOperation] = useState<string>('add');
  const [team, setTeam] = useState<string>('A');
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>('Disconnected');

  useEffect(() => {
    // Create WebSocket connection when the component mounts
    const conn = new WebSocket(WEBSOCKET_URL);

    conn.onopen = () => {
      setStatus('Connected');
      console.log('WebSocket connection opened');
    };

    conn.onclose = () => {
      setStatus('Disconnected');
      console.log('WebSocket connection closed');
    };

    conn.onerror = (err) => {
      setStatus('Error');
      console.error('WebSocket error:', err);
    };

    conn.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    setConnection(conn);

    // Cleanup WebSocket connection when component unmounts
    return () => {
      conn.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (connection && connection.readyState === WebSocket.OPEN) {
      const message: Message = { operation, team };
      connection.send(JSON.stringify(message));
      console.log('Sent message:', message);
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  return (
    <div>
      <h1>Interactive WebSocket</h1>
      <p>Status: {status}</p>
      <div>
        <label>
          Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Team:
          <select value={team} onChange={(e) => setTeam(e.target.value)}>
            <option value="A">Team A</option>
            <option value="B">Team B</option>
          </select>
        </label>
      </div>
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default MatchLiveDetail;
