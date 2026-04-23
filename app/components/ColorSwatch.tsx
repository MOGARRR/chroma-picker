import React from "react";

type ColorSwatchProps = {
  title: string;
  rgbValue: string | '0, 0, 0';
  hexValue: string | '#000000';
  hslValue: string | '0°, 0%, 0%';
};

const ColorSwatch = ({
  title,
  rgbValue,
  hexValue,
  hslValue,
}: ColorSwatchProps) => {
  return (
    <div className={`bg-orange-400 flex flex-col p-4 rounded items-center`}>
      <div className="bg-blue-700 p-4 rounded-full w-24 h-24 flex items-center justify-center text-white">
        {title}
      </div>

      <div className="w-full">
        <h2 className="text-center text-xl mb-2">Color Info</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
            <span>RGB</span>
            <span>{`rgb(${rgbValue})`}</span>
            <button className="p-1 border rounded cursor-pointer">Copy</button>
          </div>
          <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
            <span>HEX</span>
            <span>{`${hexValue}`}</span>
            <button className="p-1 border rounded cursor-pointer">Copy</button>
          </div>
          <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
            <span>HSL</span>
            <span>{`(${hslValue})`}</span>
            <button className="p-1 border rounded cursor-pointer">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
