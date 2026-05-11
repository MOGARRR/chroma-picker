"use client";
import React, { useState } from "react";
import RGB from "@/src/types/RGB";

interface PaletteProps {
  rgbDataValues: RGB[]
}

const Palette = ({rgbDataValues}: PaletteProps) => {
  const [paletteAmount, setPaletteAmount] = useState(0);

  const addId = (colorArray: any) => {
    for (let i = 0; i < colorArray.length; i++) {
      colorArray[i].id = i;
    }
    console.log(colorArray);
    return colorArray;
  };

  const parsedData = addId(rgbDataValues);
  const visibleColors = parsedData.slice(0, parsedData.length - paletteAmount);

  const removeColors = () => {
    setPaletteAmount((prev) => (prev < parsedData.length - 1 ? prev + 1 : prev));
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
