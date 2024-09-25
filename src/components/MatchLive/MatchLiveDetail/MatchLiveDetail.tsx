import React from "react";
import { Match } from "../../../interfaces/matches";
import WatchPage from "./WatchPage/WatchPage";
import InteractPage from "./InteractPage/InteractPage";



const MatchLiveDetail = ({ match }: { match: Match }) => {

  return(
    <div>
      <div>
        <p>Live Match against {match.adversary}</p>
      </div>
      <WatchPage matchID={match.id}></WatchPage>
      <InteractPage matchID={match.id}></InteractPage>
    </div>    
  )
};

export default MatchLiveDetail;
