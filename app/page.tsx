"use client";
import Image from "next/image";

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
              alt="Canvas"
            />
          </div>

          {/* Palette */}
          <div className="bg-gray-700 p-4 rounded">
            <h2 className="text-center text-xl mb-2">Palette</h2>
            <div className="flex justify-evenly">
              <div className="border bg-red-400 p-4 rounded">color</div>
              <div className="border bg-red-400 p-4 rounded">color</div>
              <div className="border bg-red-400 p-4 rounded">color</div>
              <div className="border bg-red-400 p-4 rounded">color</div>
            </div>
          </div>
        </div>

        {/* Hover and Selected */}

        <div className="flex-1 flex flex-col gap-5">
          {/* Hover Color */}
          <div
            className={`bg-orange-400 flex flex-col p-4 rounded items-center`}
          >
            <div className="bg-blue-700 p-4 rounded-full w-24 h-24 flex items-center justify-center text-white">
              Hover
            </div>

            <div className="w-full">
              <h2 className="text-center text-xl mb-2">Color Info</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
                  <span>RGB</span>
                  <span>#Val</span>
                  <button className="p-1 border rounded cursor-pointer">
                    Copy
                  </button>
                </div>
                <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
                  <span>Hex</span>
                  <span>#Val</span>
                  <button className="p-1 border rounded cursor-pointer">
                    Copy
                  </button>
                </div>
                <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
                  <span>HSL</span>
                  <span>#Val</span>
                  <button className="p-1 border rounded cursor-pointer">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Color */}
          <div
            className={`bg-green-500 flex flex-col p-4 rounded items-center gap-4`}
          >
            <div className="bg-blue-700 p-4 rounded-full w-24 h-24 flex items-center justify-center text-white">
              Selected
            </div>

            <div className="w-full">
              <h2 className="text-center text-xl mb-2">Color Info</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
                  <span>RGB</span>
                  <span>#Val</span>
                  <button className="p-1 border rounded cursor-pointer">
                    Copy
                  </button>
                </div>
                <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
                  <span>Hex</span>
                  <span>#Val</span>
                  <button className="p-1 border rounded cursor-pointer">
                    Copy
                  </button>
                </div>
                <div className="flex justify-between bg-gray-600 p-2 rounded items-center">
                  <span>HSL</span>
                  <span>#Val</span>
                  <button className="p-1 border rounded cursor-pointer">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
