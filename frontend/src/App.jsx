import React, { useState } from "react";
import HeaderTabs from "./components/HeaderTabs";
import PlayerSelection from "./components/PlayerSelections";
import ActionsGrid from "./components/ActionsGrid";
import ScorePanel from "./components/ScorePanel";
import CommentaryLog from "./components/CommentaryLog";
import { initMatch, getMatchData } from "./services/api";

const App = () => {
  const [matchId, setMatchId] = useState(null);
  const [matchData, setMatchData] = useState(null);

  const startNewMatch = async () => {
    const teamA = "Team A Name";
    const teamB = "Team B Name";
    try {
      const match = await initMatch(teamA, teamB);
      const id = match._id || match.id || null;
      setMatchId(id);
      if (id) {
        const data = await getMatchData(id);
        setMatchData(data);
      }
    } catch (error) {
      console.error("Failed to initialize match:", error);
    }
  };

  const refreshMatchData = async (updatedMatch) => {
    setMatchData(updatedMatch);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <HeaderTabs />
      <button
        onClick={startNewMatch}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start New Match
      </button>
      {matchId ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3 space-y-6">
            <PlayerSelection matchId={matchId} />
            <ActionsGrid matchId={matchId} onUpdate={refreshMatchData} />
          </div>
          <div>
            <ScorePanel matchId={matchId} matchData={matchData} />
            <CommentaryLog matchId={matchId} matchData={matchData} />
          </div>
        </div>
      ) : (
        <div>Please start a new match to begin.</div>
      )}
    </div>
  );
};

export default App;
