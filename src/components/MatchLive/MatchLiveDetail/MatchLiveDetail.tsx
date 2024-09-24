import React, { useState, useEffect } from "react";

type Message = string | object;

const MatchLiveDetail = () => {
  const [role, setRole] = useState<"watch" | "interact">("watch");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8081/ws?role=${role}`);
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };


    socket.onmessage = (event: MessageEvent) => {
      console.log("Message from server: ", event.data);
      setMessage(event.data); 
    };

    
    socket.onerror = (event: Event) => {
      console.error("WebSocket error: ", event);
      setError("WebSocket connection failed");
    };

    
    socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed: ", event);
    };

    
    return () => {
      socket.close();
    };
  }, [role]); 

  
  const sendMessage = (msg: Message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg)); 
    } else {
      console.log("WebSocket connection is not open");
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <p>Role: {role}</p>
      <button onClick={() => setRole(role === "watch" ? "interact" : "watch")}>
        Switch to {role === "watch" ? "interact" : "watch"}
      </button>
      <p>Received Message: {message}</p>
      {error && <p>Error: {error}</p>}
      {role === "interact" && (
        <div>
          <input
            type="text"
            placeholder="Send a message"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.currentTarget.value); 
                e.currentTarget.value = ""; 
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MatchLiveDetail;
