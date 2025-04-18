import React, { useEffect, useState } from "react";
import { getScoreCard } from "../services/api";

const ScorePanel = ({ matchId }) => {
  const [scoreData, setScoreData] = useState(null);

  useEffect(() => {
    if (matchId) {
      getScoreCard(matchId).then((data) => {
        const summary = `${data.totalRuns} runs, ${data.wickets} wickets, ${data.overs.toFixed(1)} overs`;
        const batsmen = data.players
          ? data.players.map((player) => ({
              name: player.playerId || player.name || "Unknown",
              runs: player.batting?.runs || 0,
              balls: player.batting?.balls || 0,
              fours: player.batting?.fours || 0,
              sixes: player.batting?.sixes || 0,
            }))
          : [];
        setScoreData({ summary, batsmen });
      });
    }
  }, [matchId]);

  if (!scoreData) return <div>Loading score...</div>;

  return (
    <div className="bg-white shadow p-4 rounded">
      <div className="font-bold">Scorecard</div>
      <p>{scoreData.summary}</p>
      <table className="text-sm mt-2">
        <thead>
          <tr>
            <th>Batsman</th>
            <th>R</th>
            <th>B</th>
            <th>4s</th>
            <th>6s</th>
          </tr>
        </thead>
        <tbody>
          {scoreData.batsmen.map((b) => (
            <tr key={b.name}>
              <td>{b.name}</td>
              <td>{b.runs}</td>
              <td>{b.balls}</td>
              <td>{b.fours}</td>
              <td>{b.sixes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScorePanel;
