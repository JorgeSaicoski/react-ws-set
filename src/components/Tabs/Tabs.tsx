import React, { useState } from "react";
import MatchList from "../MatchList/MatchList";
import MatchDetail from "../MatchDetail/MatchDetail";

const Tabs = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [direction, setDirection] = useState<'left'| 'right'>('right')

    const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

    const handleSelectMatch = (id: number) => {
      setSelectedMatchId(id || null);
    };

    const handleTabChange = (index:number) => {
        index > activeTabIndex? setDirection('right'):setDirection('left')
        setActiveTabIndex(index)
    }
    return(
        <div className="tabs-container">
            <div className="tab-titles">
                <button
                className={`tab-title ${activeTabIndex === 0 ? 'active' : ''}`}
                onClick={() => handleTabChange(0)}
                >
                Live
                </button>
                <div className={`tab-content ${direction}`}>
                    Live will be here
                </div>
            </div>
            <div className="tab-titles">
                <button
                className={`tab-title ${activeTabIndex === 1 ? 'active' : ''}`}
                onClick={() => handleTabChange(1)}
                >
                    Matches
                </button>
                <div className={`tab-content ${direction}`}>
                    <MatchList onSelectMatch={handleSelectMatch} />
                    <MatchDetail matchID={selectedMatchId} />
                </div>
            </div>
        </div>
    )
}

export default Tabs