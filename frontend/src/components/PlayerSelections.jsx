import React, { useEffect, useState } from "react";
import { getPlayers, getBowlers } from "../services/api";

const PlayerSelection = ({
  matchId,
  selectedStriker,
  setSelectedStriker,
  selectedNonStriker,
  setSelectedNonStriker,
  selectedBowler,
  setSelectedBowler,
}) => {
  const [batsmen, setBatsmen] = useState([]);
  const [bowlers, setBowlers] = useState([]);

  useEffect(() => {
    if (matchId) {
      getPlayers(matchId).then((players) => {
        setBatsmen(players.map((p) => p.playerId || p.name || p));
        // console.log("Batsmen data:", players);
      });
      getBowlers(matchId).then((bowlersData) => {
        setBowlers(bowlersData.map((p) => p.playerId || p.name || p));
      });
    }
  }, [matchId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block mb-1 font-semibold">Batsman (Striker)</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedStriker || ""}
          onChange={(e) => setSelectedStriker(e.target.value)}
        >
          {batsmen.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Batsman (Non Striker)</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedNonStriker || ""}
          onChange={(e) => setSelectedNonStriker(e.target.value)}
        >
          {batsmen.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Bowler</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedBowler || ""}
          onChange={(e) => setSelectedBowler(e.target.value)}
        >
          {bowlers.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlayerSelection;
