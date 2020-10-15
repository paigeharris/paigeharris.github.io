import Colors from './colors';

const xF = 16;

export const complementaryColor = color => {
  if (!color) return;

  return 0xffffff ^ color;
};

export const stringToColor = str => {
  if (!str) return;

  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i);
  }
  result = result % Colors.length;
  return Colors[result];
};

export const getRandomBackgroundColor = text => {
  let colorObj = {
    background: stringToColor(text)
  };
  colorObj.color = complementaryColor(colorObj.background);
  return colorObj;
};

/**
 * Converts full and short hex color code to an object with r, g, and b values
 * @param {string} hex - hex color code
 * @returns {*} Object with r, g, and b values
 */
export const hexToRgb = hex => {
  if (!hex) return;

  const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(short, (m, r, g, b) => r + r + g + g + b + b);

  const full = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return (
    full && {
      r: parseInt(full[1], xF),
      g: parseInt(full[2], xF),
      b: parseInt(full[3], xF)
    }
  );
};

/**
 * Converts full and short hex color code to an rgba string
 * @param {string} hex - hex color code
 * @param {number} [a] - alpha channel value
 * @returns {string}
 */
export const hexToRgbaString = (hex, a) => {
  if (typeof hex !== 'string') return;

  a = a !== undefined && typeof a === 'number' ? Math.min(a, 1) : 1;
  const { r, g, b } = hexToRgb(hex);

  return `rgba(${[r, g, b, a].join(', ')})`;
};
