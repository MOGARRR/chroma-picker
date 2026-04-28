"use client";
import ColorSwatch from "./components/ColorSwatch";
import Palette from "./components/Palette";
import React, { useRef, useEffect, useState } from "react";
import rgbToHex from "@/src/helpers/rgbToHex";
import rgbToHsl from "@/src/helpers/rgbToHsl";
import formatRgb from "@/src/helpers/formatRgb";


type RGB = { r: number; g: number; b: number };

export default function Home() {
  const [rgbHover, setRgbHover] = useState("rgb(0,0,0)");
  const [hexHover, setHexHover] = useState("#000000");
  const [hslHover, setHslHover] = useState("0°, 0%, 0%");
  const [rgbSelected, setRgbSelected] = useState("rgb(0,0,0)");
  const [hexSelected, setHexSelected] = useState("#000000");
  const [hslSelected, setHslSelected] = useState("0°, 0%, 0%");
  const [uploadImage, setUploadImage] = useState("/cet-image.png");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
 
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
      console.log(quantization(rgbValues, 1));
    };
  }, [uploadImage]);

  const handleMouse = (e: React.MouseEvent<HTMLCanvasElement>) => {
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

    if (e.type === "click") {
      setRgbSelected(rgbColor);
      setHexSelected(hexColor);
      setHslSelected(hslColor);
    }

    setRgbHover(rgbColor);
    setHexHover(hexColor);
    setHslHover(hslColor);
  };

  const handleImageUpload = (e: any) => {
    // UPDATE TYPE
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setUploadImage(URL.createObjectURL(file));
    }
  };

  const getLargestColorRange = (rgbValues: any) => {
    // UPDATE TYPE

    // Find Color Channel with largest Range

    // Mins values
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    // Max values
    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    // Loop through each pixel to compare and get each colors Min and Max values

    rgbValues.map((pixel: any) => {
      // UPDATE TYPE
      rMin = Math.min(rMin, pixel.r);
      gMin = Math.min(gMin, pixel.g);
      bMin = Math.min(bMin, pixel.b);

      rMax = Math.max(rMax, pixel.r);
      gMax = Math.max(gMax, pixel.g);
      bMax = Math.max(bMax, pixel.b);
    });

    // Get color range from min/max differences

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;
    const largestColorRange = Math.max(rRange, gRange, bRange);

    // Return letter based on the largest color channel range
    return rRange === largestColorRange
      ? "r"
      : gRange === largestColorRange
        ? "g"
        : "b";
  };

  const quantization = (rgbValues: RGB[], paletteAmount: number): RGB[] => {

    // Base Case

    // Depth is 2^4 for 16 colors
    const MAX_DEPTH = 4;

    // When max depth is hit, return a color that is the average of the group
    if (paletteAmount === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev: any, curr: any) => {
          prev.r += curr.r;
          prev.g += curr.g;
          prev.b += curr.b;

          return prev;
        },
        {
          r: 0,
          g: 0,
          b: 0,
        },
      );

      color.r = Math.round(color.r / rgbValues.length);
      color.g = Math.round(color.g / rgbValues.length);
      color.b = Math.round(color.b / rgbValues.length);
      return [color];
    }

    // Recursion

    const componentToSortBy = getLargestColorRange(rgbValues);


    // sort pixels by channel to create color groups
  
    rgbValues.sort((a: { [x: string]: number }, b: { [x: string]: number }) => {
      return a[componentToSortBy] - b[componentToSortBy];
    });

    const mid = rgbValues.length / 2;

    return [
      ...quantization(rgbValues.slice(0, mid), paletteAmount + 1),
      ...quantization(rgbValues.slice(mid + 1), paletteAmount + 1),
    ];
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
              onMouseMove={handleMouse}
              onClick={handleMouse}
              className="w-full h-full object-fill"
            ></canvas>
          </div>

          {/* Palette */}
          <Palette />
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
