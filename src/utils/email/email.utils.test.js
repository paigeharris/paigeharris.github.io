import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import React from 'react';

import {
  validateEmailFormat
} from './email.utils';

configure({ adapter: new Adapter() });

describe('email.utils', () => {
  const testVal1 = 'valid@email.com';
  const testVal2 = 'notValid@ema.';
  const testVal3 = '12yu@';
  const testVal4 = 'normalString';

  it('checks the return values of convertMsToDate', () => {
    let d = validateEmailFormat(testVal1);
    expect(d).toEqual(true);

    d = validateEmailFormat(testVal2);
    expect(d).toEqual(false);

    d = validateEmailFormat(testVal3);
    expect(d).toEqual(false);

    d = validateEmailFormat(testVal4);
    expect(d).toEqual(false);
  });
});
