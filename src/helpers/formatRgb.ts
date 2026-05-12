const formatRgb = (imageData: any) => {
  // UPDATE TYPE

  const rgbValues = [];

  // Condense pixel data into rgb values by creating an rgb object on every 32th/255 element
  for (let i = 0; i < imageData.length; i += 32) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
};

export default formatRgb;
