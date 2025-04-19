import React, { useState, useEffect } from "react";
import HeaderTabs from "./components/HeaderTabs";
import PlayerSelection from "./components/PlayerSelections";
import ActionsGrid from "./components/ActionsGrid";
import ScorePanel from "./components/ScorePanel";
import CommentaryLog from "./components/CommentaryLog";
import { getMatchData, initMatch } from "./services/api";

const DEFAULT_TEAM_A = "Team Alpha";
const DEFAULT_TEAM_B = "Team Beta";
const DEFAULT_PLAYERS = [
  { playerId: "p1", name: "Player 1", team: "Team Alpha" },
  { playerId: "p2", name: "Player 2", team: "Team Alpha" },
  { playerId: "p3", name: "Player 3", team: "Team Beta" },
  { playerId: "p4", name: "Player 4", team: "Team Beta" },
];

const App = () => {
  const [matchId, setMatchId] = useState(() => {
    return localStorage.getItem("matchId") || null;
  });
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedStriker, setSelectedStriker] = useState(null);
  const [selectedNonStriker, setSelectedNonStriker] = useState(null);
  const [selectedBowler, setSelectedBowler] = useState(null);

  const startNewMatch = async () => {
    try {
      setLoading(true);
      const data = await initMatch(
        DEFAULT_TEAM_A,
        DEFAULT_TEAM_B,
        DEFAULT_PLAYERS
      );
      if (data?._id) {
        setMatchId(data._id);
        localStorage.setItem("matchId", data._id);
        setMatchData(null);
        setSelectedStriker(DEFAULT_PLAYERS[0].playerId);
        setSelectedNonStriker(DEFAULT_PLAYERS[1].playerId);
        setSelectedBowler(DEFAULT_PLAYERS[1].playerId);
      } else {
        console.error("Match ID not returned");
      }
    } catch (err) {
      console.error("Error initializing match:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!matchId) return;

    const fetchData = async () => {
      try {
        const data = await getMatchData(matchId);
        setMatchData(data);
      } catch (err) {
        console.error("Error fetching match data:", err);
      }
    };

    fetchData();
  }, [matchId]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <HeaderTabs />

      <div className="flex justify-end mb-4">
        <button
          onClick={startNewMatch}
          className="px-4 py-4 my-4v hover:cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Starting..." : "Start New Match"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {matchId && matchData && (
            <>
              <PlayerSelection
                matchId={matchId}
                selectedStriker={selectedStriker}
                setSelectedStriker={setSelectedStriker}
                selectedNonStriker={selectedNonStriker}
                setSelectedNonStriker={setSelectedNonStriker}
                selectedBowler={selectedBowler}
                setSelectedBowler={setSelectedBowler}
              />
              <ActionsGrid
                matchId={matchId}
                strikerId={selectedStriker}
                bowlerId={selectedBowler}
                onUpdate={(updatedMatch) => setMatchData(updatedMatch)}
              />
            </>
          )}
        </div>
        <div>
          <ScorePanel matchId={matchId} matchData={matchData} />
          <CommentaryLog matchId={matchId} matchData={matchData} />
        </div>
      </div>
    </div>
  );
};

export default App;
