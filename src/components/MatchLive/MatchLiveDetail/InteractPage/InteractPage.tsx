import { Badge, Box, Button, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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
    const bg = useColorModeValue("teal.100", "gray.100");

    return (
        <Box p={5} maxW="500px" mx="auto" textAlign="center" borderWidth="1px" borderRadius="lg" boxShadow="md" bg={bg}>
            <Heading as="h3" size="lg" mb={4}>
                Interacting with Match {matchID}
            </Heading>
            <Badge mb={4} colorScheme={connected ? "green" : "red"}>
                {connected ? "Connected" : "Not Connected"}
            </Badge>
            <Stack direction="column" justify="space-around" mb={4}>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">Team A Score</Text>
                    <Stack direction="row" justify="center" mb={4}>
                        <Button colorScheme="red" onClick={() => sendMessage("remove", "A")}>-</Button>                 
                        <Text fontSize="2xl" color="teal.500">{score.team_a_score}</Text>        
                        <Button colorScheme="teal" onClick={() => sendMessage("add", "A")}>+</Button>
                    </Stack>
                </Box>
                <Box>
                    <Text fontSize="xl" fontWeight="bold">Team B Score</Text>
                    <Stack direction="row" justify="center" mb={4}>
                        <Button colorScheme="red" onClick={() => sendMessage("remove", "B")}>-</Button>                 
                        <Text fontSize="2xl" color="teal.500">{score.team_b_score}</Text>        
                        <Button colorScheme="teal" onClick={() => sendMessage("add", "B")}>+</Button>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default InteractPage