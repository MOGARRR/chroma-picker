import getLargestColorRange from "./getLargestColorRange";
import RGB from "../types/RGB";

const quantization = (rgbValues: RGB[], depth = 0): RGB[] => {
  // Base Case

  // Depth is 2^4 for 16 colors
  const MAX_DEPTH = 4;

  // When max depth is hit, return a color that is the average of the group
  if (rgbValues.length === 0) {
  return [];
}
  if (depth === MAX_DEPTH) {
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

  const mid = Math.floor(rgbValues.length / 2);

  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid), depth + 1),
  ];
};

export default quantization;
