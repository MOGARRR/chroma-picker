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

export default getLargestColorRange;
