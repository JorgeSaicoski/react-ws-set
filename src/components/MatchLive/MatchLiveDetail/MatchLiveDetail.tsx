import React from "react";
import { Match } from "../../../interfaces/matches";
import WatchPage from "./WatchPage/WatchPage";
import InteractPage from "./InteractPage/InteractPage";
import { Box, useColorModeValue, Text } from "@chakra-ui/react";



const MatchLiveDetail = ({ match }: { match: Match }) => {
  const bg = useColorModeValue("gray.800", "gray.100");
  const textColor = useColorModeValue("teal", "white");


  return(
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      p={4}
      bg={bg}
      boxShadow="md"
      mb={6}
    >
      <Text
        color={textColor}
      >
        Live Match against {match.adversary}
      </Text>
      <WatchPage matchID={match.id}></WatchPage>
      <InteractPage 
        matchID={match.id}
      ></InteractPage>
    </Box>    
  )
};

export default MatchLiveDetail;
