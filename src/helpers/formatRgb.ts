const formatRgb = (imageData: any) => {
  // UPDATE TYPE

  const rgbValues = [];

  // Condense pixel data into rgb values by creating an rgb object on every 4th/255 element
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i++],
      b: imageData[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
};

export default formatRgb;
