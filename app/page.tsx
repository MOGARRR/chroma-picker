"use client";
import ColorSwatch from "./components/ColorSwatch";
import Palette from "./components/Palette";
import React, { useRef, useEffect, useState } from "react";
import rgbToHex from "@/src/helpers/rgbToHex";
import rgbToHsl from "@/src/helpers/rgbToHsl";

export default function Home() {
  const [rgbHover, setRgbHover] = useState("");
  const [hexHover, setHexHover] = useState("");
  const [hslHover, setHslHover] = useState("");
  const [rgbSelected, setRgbSelected] = useState("");
  const [hexSelected, setHexSelected] = useState("");
  const [hslSelected, setHslSelected] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = `/cet-image.png`;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;
    const rgbColor = `${data[0]}, ${data[1]}, ${data[2]}`;
    const hexColor = rgbToHex(data[0], data[1], data[2]);
    const hslColor = rgbToHsl(data[0], data[1], data[2]);

    if (e.type === "click") {
      setRgbSelected(rgbColor);
      setHexSelected(hexColor);
      setHslSelected(hslColor);
    }

    setRgbHover(rgbColor);
    setHexHover(hexColor);
    setHslHover(hslColor);
  };

  return (
    <div className="bg-stone-300 w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-500 w-4/5 h-4/5 flex p-4 gap-4">
        {/* Canvas and Palette */}

        <div className="flex-1 flex flex-col gap-4">
          {/* Canvas / Image */}
          <div className="flex-1 bg-black flex items-center justify-center cursor-crosshair">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouse}
              onClick={handleMouse}
              className="w-full h-full"
            ></canvas>
          </div>

          {/* Palette */}
          <Palette />
        </div>

        {/* Hover and Selected */}

        <div className="flex-1 flex flex-col gap-5">
          {/* Hover Color */}
          <ColorSwatch
            title="Hover"
            rgbValue={rgbHover}
            hexValue={hexHover}
            hslValue={hslHover}
          />

          {/* Selected Color */}
          <ColorSwatch
            title="Selected"
            rgbValue={rgbSelected}
            hexValue={hexSelected}
            hslValue={hslSelected}
          />
        </div>
      </div>
    </div>
  );
}
