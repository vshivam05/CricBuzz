import axios from "axios";

const API_URL = "http://localhost:5000"; // Adjust the URL as needed

export const initMatch = async (teamA, teamB, players) => {
  const response = await axios.post(`${API_URL}/init`, {
    teamA,
    teamB,
    players,
  });
  return response.data;
};

export const addDelivery = async (matchId, delivery) => {
  const response = await axios.post(`${API_URL}/${matchId}/delivery`, delivery);
  return response.data;
};

export const getMatch = async (matchId) => {
  const response = await axios.get(`${API_URL}/${matchId}`);
  return response.data;
};

export const undoDelivery = async (matchId) => {
  const response = await axios.patch(`${API_URL}/${matchId}/undo`);
  return response.data;
};
