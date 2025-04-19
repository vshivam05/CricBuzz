import React from "react";
import { addDelivery, getMatchData } from "../services/api";

const actionGroups = [
  {
    items: [
      {
        label: "Ball Start",
        className: "flex-1 h-15 bg-green-200 hover:bg-green-400",
      },
      { label: "0", className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400" },
      { label: "1", className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400" },
      { label: "Wicket", className: "flex-1 h-15 bg-red-200 hover:bg-red-400" },
    ],
    spacing: "mb-2", 
  },
  {
    items: [
      {
        label: "Wide",
        className: "flex-1 h-15 bg-yellow-200 hover:bg-yellow-400",
      },
      {
        label: "No Ball",
        className: "flex-1 h-15 bg-yellow-200 hover:bg-yellow-400",
      },
      { label: "2", className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400" },
      { label: "6", className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400" },
      { label: "4", className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400" },
    ],
    spacing: "mb-2",
  },
  {
    items: [
      {
        label: "Bowler Stop",
        className: "flex-1 h-15 bg-purple-200 hover:bg-purple-400",
      },
      {
        label: "1 or 2",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "2 or 4",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "4 or 6",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "Ball In Air",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
    ],
    spacing: "mb-2",
  },
  {
    items: [
      {
        label: "Others",
        className: "flex-1 h-15 bg-gray-200 hover:bg-gray-400",
      },
      { label: "3", className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400" },
      {
        label: "Boundary Check",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "Appeal",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "Catch Drop",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
    ],
    spacing: "mb-2",
  },
  {
    items: [
      {
        label: "Leg Bye",
        className: "flex-1 h-15 bg-yellow-200 hover:bg-yellow-400",
      },
      {
        label: "Bye",
        className: "flex-1 h-15 bg-yellow-200 hover:bg-yellow-400",
      },
      {
        label: "Third Umpire",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "Review",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
    ],
    spacing: "mb-2",
  },
  {
    items: [
      {
        label: "Done",
        className: "flex-1 h-15 bg-green-200 hover:bg-green-400",
      },
      {
        label: "Misfield",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "Overthrow",
        className: "flex-1 h-15 bg-blue-200 hover:bg-blue-400",
      },
      {
        label: "Wicket Confirm",
        className: "flex-1 h-15 bg-red-200 hover:bg-red-400",
      },
    ],
    spacing: "mb-0",
  },
];

const mapActionToDelivery = (action, strikerId, bowlerId) => {
  let batsmanRuns = 0;
  let type = "normal";
  let legal = true;
  let extras = { overthrow: 0 };
  let wicket = null;

  switch (action) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "6":
      batsmanRuns = parseInt(action, 10);
      break;
    case "Wide":
      type = "wide";
      legal = false;
      extras.wide = 1;
      break;
    case "No Ball":
      type = "no ball";
      legal = false;
      extras.noBall = 1;
      break;
    case "Wicket":
      wicket = { kind: "bowled", playerOut: strikerId };
      break;
    default:
      console.warn(`Unhandled action: ${action}`);
      return null;
  }

  return {
    batsmanId: strikerId,
    bowlerId: bowlerId,
    batsmanRuns,
    type,
    legal,
    extras,
    ...(wicket ? { wicket } : {}),
  };
};

const ActionsGrid = ({ matchId, onUpdate, strikerId, bowlerId }) => {
  const handleAction = async (label) => {
    console.log("Action clicked:", label);
    if (!matchId) return;
    const delivery = mapActionToDelivery(label, strikerId, bowlerId);
    console.log("Mapped delivery:", delivery);
    if (!delivery) return; 

    try {
      await addDelivery(matchId, delivery);
      if (onUpdate) {
        const updatedMatch = await getMatchData(matchId);
        onUpdate(updatedMatch);
      }
    } catch (error) {
      console.error("Error updating delivery:", error);
    }
  };

  return (
    <div className="w-full mt-4">
      {actionGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={`flex flex-nowrap gap-2 ${group.spacing}`}
        >
          {group.items.map((action, actionIndex) => (
            <button
              type="button"
              key={actionIndex}
              className={`p-2 rounded hover:cursor-pointer text-sm text-center ${action.className}`}
              onClick={() => handleAction(action.label)}
            >
              {action.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActionsGrid;
