import axios from "axios";

const API_URL = "http://localhost:5000/api/match";

export const initMatch = async (teamA, teamB, players) => {
  const response = await axios.post(`${API_URL}/init`, {
    teamA,
    teamB,
    players,
  });
  console.log("Match initialized:", response.data);
  return response.data;
};

export const getMatchData = async (matchId) => {
  const res = await fetch(`${API_URL}/${matchId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch match data");
  }
  const match = await res.json();
  return match;
};

export const getPlayers = async (matchId) => {
  try {
    const match = await getMatchData(matchId);
    return match.players || [];
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

export const getBowlers = async (matchId) => {
  try {
    const match = await getMatchData(matchId);
    return match.players
      ? match.players.filter((player) => player.bowling)
      : [];
  } catch (error) {
    console.error("Error fetching bowlers:", error);
    return [];
  }
};

export const getScoreCard = async (matchId) => {
  try {
    const match = await getMatchData(matchId);
    console.log("Scorecard data:", match);
    return {
      totalRuns: match.score?.totalRuns || 0,
      wickets: match.score?.wickets || 0,
      overs: (match.currentOver || 0) + (match.currentBall || 0) / 6,
      players: match.players || [],
    };
  } catch (error) {
    console.error("Error fetching scorecard:", error);
    return {
      totalRuns: 0,
      wickets: 0,
      overs: 0,
      players: [],
    };
  }
};

export const getCommentaryLog = async (matchId) => {
  try {
    const match = await getMatchData(matchId);
    return match.deliveries || [];
  } catch (error) {
    console.error("Error fetching commentary log:", error);
    return [];
  }
};

export const addDelivery = async (matchId, delivery) => {
  try {
    const response = await axios.post(
      `${API_URL}/${matchId}/delivery`,
      delivery
    );
    return response.data;
  } catch (error) {
    console.error("Error adding delivery:", error);
    throw error;
  }
};

export const undoDelivery = async (matchId) => {
  try {
    const response = await axios.patch(`${API_URL}/${matchId}/undo`);
    return response.data;
  } catch (error) {
    console.error("Error undoing delivery:", error);
    throw error;
  }
};
