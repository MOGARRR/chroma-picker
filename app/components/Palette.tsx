"use client";
import React, { useState } from "react";

const mockData = [
  { id: 1, color: "bg-blue-400" },
  { id: 2, color: "bg-red-400" },
  { id: 3, color: "bg-pink-400" },
  { id: 4, color: "bg-orange-400" },
  { id: 5, color: "bg-green-400" },
];

const Palette = () => {
  const [paletteAmount, setPaletteAmount] = useState(0);
  const visibleColors = mockData.slice(0, mockData.length - paletteAmount);

  const removeColors = () => {
    setPaletteAmount((prev) => (prev < mockData.length - 1 ? prev + 1 : prev));
  };

  const addColors = () => {
    setPaletteAmount((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="bg-gray-700 h-1/6 rounded-lg">
      <h2 className="text-center text-xl p-1">Palette</h2>
      <div className="flex h-3/5 text-center p-2">
        <button
          className="bg-gray-400 w-1/8  rounded-l-lg cursor-pointer"
          onClick={removeColors}
        >
          ➖
        </button>
        {visibleColors.map((item) => (
          <div key={item.id} className={`${item.color} flex-2`} />
        ))}
        <button
          className="bg-gray-400 w-1/8 rounded-r-lg cursor-pointer"
          onClick={addColors}
        >
          ➕
        </button>{" "}
      </div>
    </div>
  );
};

export default Palette;
