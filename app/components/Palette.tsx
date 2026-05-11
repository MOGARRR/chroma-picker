"use client";
import React, { useState } from "react";

const mockData = [
  { r: 2, g: 133, b: 255 },
  { r: 255, g: 2, b: 2 },
  { r: 255, g: 2, b: 234 },
  { r: 255, g: 145, b: 2 },
  { r: 255, g: 238, b: 2 },
];

const Palette = () => {
  const [paletteAmount, setPaletteAmount] = useState(0);

  const addId = (colorArray: any) => {
    for (let i = 0; i < colorArray.length; i++) {
      colorArray[i].id = i;
    }
    return colorArray;
  };

  const parsedData = addId(mockData);
  const visibleColors = parsedData.slice(0, mockData.length - paletteAmount);

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
        {visibleColors.map((item: any) => (
          <div
            key={item.id}
            className={`flex-2`}
            style={{ backgroundColor: `rgb(${item.r}, ${item.g},${item.b})` }}
          />
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
