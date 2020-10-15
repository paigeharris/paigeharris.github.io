import React from 'react';
import { hexToRgb, hexToRgbaString } from './color.utils';

describe('color util functions', () => {
  it('converts a hex color to rbg object', () => {
    const hex = '#B88183';
    const rgb = hexToRgb(hex);
    expect(rgb).toEqual({ r: 184, g: 129, b: 131 });
  });

  it('converts a hex color to an rgba string', () => {
    const hex = '#B88183';

    let rgbaStr = hexToRgbaString(hex);
    expect(rgbaStr).toEqual('rgba(184, 129, 131, 1)');

    rgbaStr = hexToRgbaString(hex, 0.5);
    expect(rgbaStr).toEqual('rgba(184, 129, 131, 0.5)');
  })
});