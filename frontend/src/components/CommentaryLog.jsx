import React, { useEffect, useState } from "react";
import { getCommentaryLog } from "../services/api";

const CommentaryLog = ({ matchId }) => {
  const [logs, setLogs] = useState([]);

  const fetchCommentary = async () => {
    if (!matchId) return;

    const deliveries = await getCommentaryLog(matchId);
    const commentaryLogs = deliveries.map((delivery, index) => {
      const ballNumber = index + 1;
      const batsmanRuns = delivery.batsmanRuns || 0;
      const extras = delivery.extras
        ? Object.values(delivery.extras).reduce((a, b) => a + b, 0)
        : 0;
      const totalRuns = batsmanRuns + extras;
      const text = `Ball ${ballNumber}: ${totalRuns} run${
        totalRuns !== 1 ? "s" : ""
      }`;
      return { ball: ballNumber, text };
    });
    setLogs(commentaryLogs);
  };

  useEffect(() => {
    if (matchId) {
     
      fetchCommentary();

      
      const intervalId = setInterval(fetchCommentary, 5000);

     
      return () => clearInterval(intervalId);
    }
  }, [matchId]);

  return (
    <div className="mt-6 bg-white p-4 shadow rounded overflow-y-scroll h-50">
      <div className="font-semibold mb-2 ">Ball-by-Ball Commentary</div>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.ball} className="text-sm text-gray-700">
            <span className="font-bold">{log.ball}:</span> {log.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentaryLog;
