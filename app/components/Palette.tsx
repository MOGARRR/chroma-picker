import React from "react";

const Palette = () => {

  return (
    <div className="bg-gray-700 h-1/6 rounded-lg">
      <h2 className="text-center text-xl p-1">Palette</h2>
      <div className="flex h-3/5 text-center p-2">
        <button className="bg-gray-400 flex-1 rounded-l-lg cursor-pointer">
          ➖
        </button>
        <div className="bg-red-400 flex-2"></div>
        <div className="bg-pink-400 flex-2"></div>
        <div className="bg-green-400 flex-2"></div>
        <div className="bg-blue-400 flex-2"></div>
        <button className="bg-gray-400 flex-1 rounded-r-lg cursor-pointer">
          ➕
        </button>{" "}
      </div>
    </div>
  );
};

export default Palette;
