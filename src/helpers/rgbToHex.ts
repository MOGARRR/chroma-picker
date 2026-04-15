/*
RGB TO HEX FORMULA

RGB numbers range from 0 to 255 
Hex works with sets of 16 (hexadecimal means 16)

To Convert, Divide each number by 16 to get a whole number of x and the remainder y

R/16 = x + y/16
G/16 = x' + y'/16
B/16 = x" + y"/16

If x is a whole number, the remainder y is 0 
If the remainder is a decimal, multiply the number by 16 to get a whole number

This will give you # X1 Y1, X2 Y2, X3 Y3
Translate this using hex/base16 numbering system (0-9 and A-F = 10-15)

toString can convert to hex by passing 16 as an argument

Ex.
RGB = (80, 6, 143)

1.

 R = 80 / 16 = 5
 G = 6 / 16 = 0.375
 B = 143 / 16 = 8.9375

2.

0.375 * 16 = 6
0.9375 * 16 = 15

3.

5 = 50
0.375 = 06
8.9375 = 8F

HEX = #50068F

*/

const rgbToHex = (r: any, g: any, b: any) => {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return `#${r}${g}${b}`.toUpperCase();
};


