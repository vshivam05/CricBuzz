import React, { useState, useEffect } from "react";
import { getPlayers, getBowlers } from "../services/api";

const PlayerSelection = ({ matchId }) => {
  const [batsmen, setBatsmen] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [selected, setSelected] = useState({
    striker: "",
    nonStriker: "",
    bowler: "",
  });

  useEffect(() => {
    if (matchId) {
      getPlayers(matchId).then((players) => {
        setBatsmen(players.map((p) => p.playerId || p.name || p));
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
          value={selected.striker}
          onChange={(e) =>
            setSelected({ ...selected, striker: e.target.value })
          }
        >
          {batsmen.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">
          Batsman (Non Striker)
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={selected.nonStriker}
          onChange={(e) =>
            setSelected({ ...selected, nonStriker: e.target.value })
          }
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
          value={selected.bowler}
          onChange={(e) => setSelected({ ...selected, bowler: e.target.value })}
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
