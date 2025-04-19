import React from "react";

const HeaderTabs = () => {
  return (
    <div className="flex border-b ">
      <button className="px-4 py-2 m-2 bg-white border-r text-gray-500">
        Settings
      </button>
      <button className="px-4 py-2 m-2 bg-blue-600 text-white font-semibold">
        Match Commentary
      </button>
    </div>
  );
};

export default HeaderTabs;
