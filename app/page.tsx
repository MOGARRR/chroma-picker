"use client";
import Image from "next/image";
import ColorSwatch from "./components/ColorSwatch";
import Palette from "./components/Palette";

export default function Home() {
  return (
    <div className="bg-stone-300 w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-500 w-4/5 h-4/5 flex p-4 gap-4">
        {/* Canvas and Palette */}

        <div className="flex-1 flex flex-col gap-4">
          {/* Canvas / Image */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <Image
              className="object-cover w-full h-full"
              src="/cet-image.png"
              width={500}
              height={500}
              loading="eager"
              alt="Canvas"
            />
          </div>

          {/* Palette */}
          <Palette/>
        </div>

        {/* Hover and Selected */}

        <div className="flex-1 flex flex-col gap-5">
          {/* Hover Color */}
          <ColorSwatch title="Hover" rgbValue="something" hexValue="something" hslValue="something"/>

          {/* Selected Color */}
          <ColorSwatch title="Selected" rgbValue="something" hexValue="something" hslValue="something"/>
        </div>
      </div>
    </div>
  );
}
