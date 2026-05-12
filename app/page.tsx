"use client";
import ColorSwatch from "./components/ColorSwatch";
import Palette from "./components/Palette";
import React, { useRef, useEffect, useState } from "react";
import rgbToHex from "@/src/helpers/rgbToHex";
import rgbToHsl from "@/src/helpers/rgbToHsl";
import formatRgb from "@/src/helpers/formatRgb";
import quantization from "@/src/helpers/quantization";
import RGB from "@/src/types/RGB";

export default function Home() {
  const [rgbHover, setRgbHover] = useState("rgb(0,0,0)");
  const [hexHover, setHexHover] = useState("#000000");
  const [hslHover, setHslHover] = useState("0°, 0%, 0%");
  const [rgbSelected, setRgbSelected] = useState("rgb(0,0,0)");
  const [hexSelected, setHexSelected] = useState("#000000");
  const [hslSelected, setHslSelected] = useState("0°, 0%, 0%");
  const [uploadImage, setUploadImage] = useState("/cet-image.png");
  const [rgbData, setRgbData] = useState<RGB[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Acts as a render lock by storing if a frame is scheduled or not
  const animationFrameRef = useRef<number | null>(null);

  // saves the last mouseMove coordinates
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = uploadImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const rgbValues = formatRgb(imageData.data);
      setRgbData(quantization(rgbValues));
    };
  }, [uploadImage]);

  const updateHoverColor = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgbColor = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    const hexColor = rgbToHex(data[0], data[1], data[2]);
    const hslColor = rgbToHsl(data[0], data[1], data[2]);

    setRgbHover(rgbColor);
    setHexHover(hexColor);
    setHslHover(hslColor);
  };

    const handleSelectedColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgbColor = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    const hexColor = rgbToHex(data[0], data[1], data[2]);
    const hslColor = rgbToHsl(data[0], data[1], data[2]);

    setRgbSelected(rgbColor);
    setHexSelected(hexColor);
    setHslSelected(hslColor);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mousePositionRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };

    // Checks if frame is already scheduled to prevent duplicates (Throttling)
    if (animationFrameRef.current) return;

    // Schedules frame
    animationFrameRef.current = requestAnimationFrame(() => {
      const { x, y } = mousePositionRef.current;

      updateHoverColor(x, y);

    // Unlocks to allow next frames to be scheduled
      animationFrameRef.current = null;
    });
  };


  const handleImageUpload = (e: any) => {
    // UPDATE TYPE
    const file = e.target.files[0];
    if (file) {
      setUploadImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-stone-300 w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-500 w-4/5 h-4/5 flex p-4 gap-4">
        {/* Canvas and Palette */}

        <div className="flex-1 flex flex-col gap-4">
          {/* Canvas / Image */}
          <div className="flex-1 bg-black flex items-center justify-center cursor-crosshair h-full overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onClick={handleSelectedColor}
              className="w-full h-full object-fill"
            ></canvas>
          </div>

          {/* Palette */}
          <Palette rgbDataValues={rgbData} />
          <label className=" flex justify-around p-2 bg-gray-600 w-full rounded-lg border-2">
            Upload your own image:
            <input
              type="file"
              id="uploadImage"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageUpload(e)}
            />
          </label>
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
