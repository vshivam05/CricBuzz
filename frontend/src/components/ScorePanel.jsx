import React from "react";

const ScorePanel = ({ matchData }) => {
  if (!matchData) return <div>No score data available</div>;

  const totalRuns = matchData.score?.totalRuns || 0;
  const wickets = matchData.score?.wickets || 0;

  const overs = `${matchData.currentOver || 0}.${matchData.currentBall || 0}`;

  // console.log(
  //   "ScorePanel data:",
  //   matchData.currentOver,
  //   matchData.currentBall,
  //   overs
  // );

  const summary = `${totalRuns} runs, ${wickets} wickets, ${overs} overs`;

  const batsmen = (matchData.players || []).map((player) => ({
    name: player.name || player.playerId || "Unknown",
    runs: player.batting?.runs || 0,
    balls: player.batting?.balls || 0,
    fours: player.batting?.fours || 0,
    sixes: player.batting?.sixes || 0,
  }));

  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <div className="font-bold text-lg mb-2">Scorecard</div>
      <p className="mb-2">{summary}</p>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-1">Batsman</th>
            <th className="text-right py-1">R</th>
            <th className="text-right py-1">B</th>
            <th className="text-right py-1">4s</th>
            <th className="text-right py-1">6s</th>
          </tr>
        </thead>
        <tbody>
          {batsmen.map((batsman, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-100">
              <td className="py-1">{batsman.name}</td>
              <td className="text-right py-1">{batsman.runs}</td>
              <td className="text-right py-1">{batsman.balls}</td>
              <td className="text-right py-1">{batsman.fours}</td>
              <td className="text-right py-1">{batsman.sixes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScorePanel;
