import React from 'react';
import { addDelivery, getMatchData } from '../services/api';

const actions = [
  'Ball Start', '0', '1', 'Wicket',
  'Wide', 'No Ball', '2', '6', '4',
  'Bowler Stop', '1 or 2', '2 or 4', '4 or 6', 'Ball In Air',
  '3', 'Boundary Check', 'Appeal', 'Catch Drop',
  'Leg Bye', 'Bye', 'Third Umpire', 'Review',
  'Done', 'Misfield', 'Overthrow', 'Wicket Confirm', 'Others'
];

const ActionsGrid = ({ matchId, onUpdate }) => {
  const handleAction = async (label) => {
    if (!matchId) return;
    // Construct delivery object based on label
    const delivery = { action: label };
    try {
      await addDelivery(matchId, delivery);
      if (onUpdate) {
        const updatedMatch = await getMatchData(matchId);
        onUpdate(updatedMatch);
      }
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-4">
      {actions.map((label, idx) => (
        <button
          key={idx}
          className="p-2 bg-blue-200 rounded hover:bg-blue-400 text-sm text-center"
          onClick={() => handleAction(label)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default ActionsGrid;
