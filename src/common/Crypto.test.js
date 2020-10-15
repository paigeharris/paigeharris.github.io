import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Crypto from './Crypto';

configure({ adapter: new Adapter() });

describe('Crypto', () => {

  it('genRandomBytes, should generate random bytes equal to passed in int', () => {
    const len = 16;
    const len2 = 45;

    expect(Crypto.genRandomBytes(len).length).toEqual(len);
  });


  it('genCnonce, should generate random bytes in base64 format equal to passed in int', () => {
    const len = 16;

    expect(Crypto.genRandomBytes(len).length).toEqual(len);
  });

  it('padVal, should pad a string to be divisible by 16', () => {
    const password = 'password';
    const longerWord = 'ThisIsSomeWordThatIs';

    expect(Crypto.padVal(password).length).toEqual(16);
    expect(Crypto.padVal(longerWord).length).toEqual(32);
  });

  it('hashPassword, should hash password with CBC method, and base64 url encode', () => {
    const password = 'test';
    const nonce = Crypto.genCnonce();
    const cnonce = Crypto.genCnonce();

    expect(Crypto.hashPassword(password, nonce, cnonce)).toHaveLength(43);
  });

});