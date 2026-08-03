"use client";
import React, { useEffect, useMemo, useState } from "react";
import RGB from "@/src/types/RGB";

interface PaletteProps {
  rgbDataValues: RGB[];
  paletteDepth: number;
  setPaletteDepth: React.Dispatch<React.SetStateAction<number>>;
  handleSelectedPaletteColor: ( r:number, g:number, b:number) => void;
}

const Palette = ({ rgbDataValues, paletteDepth, setPaletteDepth, handleSelectedPaletteColor }: PaletteProps) => {
  const [paletteAmount, setPaletteAmount] = useState(0); 

  // useMemo to cache and to avoid recalculating on each render
  const visibleColors = useMemo(() => {
    return rgbDataValues.slice(0, rgbDataValues.length - paletteAmount);
  }, [rgbDataValues, paletteAmount]);



  const removeColors = () => {
    if (paletteDepth + 1 === 3) return;
    setPaletteDepth(( prev) => prev + 1)  
  };

  const addColors = () => {
  if (paletteDepth === 0) return;
   setPaletteDepth(( prev) => prev - 1);
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
        {visibleColors.map((item: any, index: number) => (
          <div
            key={index}
            className={`flex-2 cursor-pointer hover:flex-4 hover:border-3 border-black`}
            style={{ backgroundColor: `rgb(${item.r}, ${item.g},${item.b})` }}            
            onClick={() => handleSelectedPaletteColor(item.r, item.g, item.b)}
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
