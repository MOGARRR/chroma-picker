/*
RGB TO HSL FORMULA 

RGB numbers range from 0 to 255 

HSL uses degrees and percentages

H is the degree/angle of the hue on a color wheel
S is the percentage of Saturation (amount of color/chroma)
L is the percentage of Light (How bright the color is)

To convert, divide each number by 255 to get value in the range of 0-1

R/255 = x 
G/255 = y
B/255 = z

Then get the Min and Max (Lowest and Highest numbers) values 

To get the Luminance(L), Add Min and Max then divide by 2
round to the nearest hundredth (.00)

l = (Min + Max) / 2


To get the Saturation(S), Compare L to 0.5

If L <= 0.5 

S = (Min - Max) / (Max + Min)

if L > 0.5 

S = (Max - Min) / ( 2 - max - min )

Then round to the nearest hundredth for a percentage

IF MIN AND MAX ARE EQUAL

That means the color has no saturation and we don't have to calculate Hue (H) so we set H to 0

If all the RGB are equal it means the color is a shade of gray

To get Hue(H), Use one of these formulas depending on which color was the Max:

If R was Max - H = (G - B) / (Max - Min)
If G was Max H = 2 + (B - R) / (Max - Min)
If B was Max H = 4 + (R - G) / (Max - Min)

Then you need to convert H into a degree by multiplying it by 60

H° = H * 60

If H is negative, Add 360 to match the degrees of a circle

H = -H + 360

Then combine to get the HSL

Ex. 

RGB = (142, 210, 32)

1.

R = 142 / 255 = 0.556 
G = 210 / 255 = 0.823
B = 32 / 255 = 0.125

R = 0.56
G = 0.82
B = 0.13

Min = B
Max = G

2.

L = (0.13 + 0.82) / 2 = 0.475

L = 0.48

3.

L < 0.5

S = (O.13 - 0.82) / (0.82 + 0.13) = 0.726

S = 0.73

4.

Max = G

H = 2 + (0.13 - 0.56) / (0.82 - 0.13) = 1.376

H° = 1.38 * 60 = 82.8

H° = 83°

HSL = 83°, 73%, 48%
*/

const roundNum = (num: any) => Math.round(num * 100) / 100;

const rgbToHsl = (r: any, g: any, b: any) => {

  // 1. Get min and max
  r = roundNum(r / 255);
  g = roundNum(g / 255);
  b = roundNum(b / 255);

  const cArray = [r,g,b].sort()
  
  const cMax = cArray[2]
  const cMin = cArray[0]

  // 2. Get L, if min === max the color is gray so return zero hue and saturation

  let l = roundNum((cMin + cMax) / 2)
  console.log(l);

  if (cMax === cMin){
    return `0°, 0.0, ${l * 100}%`
  }
  
  // 3. Get saturation based on light value

   let s = 0

  l <= 0.5 ? s = roundNum((cMin - cMax) / (cMax + cMin)) 
  : s = roundNum((cMax - cMin) / (2.0 - cMax - cMin))

  //4. Get hue based on which color value is max

  let h = 0

  r === cMax ? h = roundNum((g - b) / (cMax - cMin)) 
  : g === cMax ? h = roundNum(2 + (b - r) / (cMax - cMin))
    : h = roundNum((r - g) / (cMax - cMin))


   
  h = h * 60;
  
  if (h < 0) h += 360

  h = Math.round(h)
  s = Math.abs(s * 100)
  l = Math.abs(l * 100)

  return `${h}°, ${s}%, ${l}%`
}
