import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Crypto from '../Crypto';
import * as api from './api';
import * as constants from './constants';

configure({ adapter: new Adapter() });

describe('Login API', () => {

  it('genPostObj, should generate post fetch http object', () => {
    const headers = constants.HEADERS;
    const data = { password: 'test', email: 'ameiling' };
    const body = JSON.stringify(data);
    const testPostObj = {
      method: constants.METHOD_POST,
      mode: constants.MODE_CORS,
      headers,
      body
    };
    const postObj = api.genPostObj(data);

    expect(postObj).toEqual(testPostObj);
  });

  it('should fetch a nonce', () => {
    const email = 'test';
    const cnonce = "OKbTsi5fc//nlRXeTLPX3g==";
    const nonce = "FUQ4nw27tCAErVGZiMdV5A==";
    const timestamp = "2017-12-11T19:26:57.66449833Z";
    const error = '';
    const response = {
      cnonce,
      email,
      error,
      nonce,
      timestamp
    };
    fetch.mockResponse(JSON.stringify(response));

    expect.assertions(1);
    return api.fetchNonce(email).then((data) => {
      expect(data).toEqual(response);
    });
  });

  it('should handle errors when fetching the nonce', () => {
    const email = 'test';
    const cnonce = "OKbTsi5fc//nlRXeTLPX3g==";
    const nonce = "FUQ4nw27tCAErVGZiMdV5A==";
    const timestamp = "2017-12-11T19:26:57.66449833Z";
    const error = 'NONCE Error';
    const response = {
      cnonce,
      email,
      error,
      nonce,
      timestamp
    };
    fetch.mockResponse(JSON.stringify({ ...response }));
    expect.assertions(1);
    return api.fetchNonce(email).catch(e => {
      expect(e).toEqual(error);
    });
  });

  it('should invoke the login api', () => {
    const password = 'password';
    const email = 'test';
    const cnonce = "OKbTsi5fc//nlRXeTLPX3g==";
    const nonce = "FUQ4nw27tCAErVGZiMdV5A==";
    const timestamp = "2017-12-11T19:26:57.66449833Z";
    const error = '';
    const status = 'success';
    const user_auth_mode = 'single-factor';

    fetch.mockResponseOnce(JSON.stringify({
      cnonce,
      email,
      error,
      nonce,
      timestamp,
      user_auth_mode
    }));

    fetch.mockResponseOnce(JSON.stringify({
      status,
      error
    }));

    expect.assertions(1);
    return api.fetchLogin(password, email).then((data) => {
      expect(data).toEqual({
        status,
        error,
        cnonce,
        nonce,
        user_auth_mode
      });
    });
  });

  it('should handle errors on login', () => {
    const pw = 'Password';
    const email = 'test';
    const nonce = Crypto.genCnonce();
    const cnonce = Crypto.genCnonce();
    const password = Crypto.hashPassword(pw, nonce, cnonce);
    const error = {
      error: 'nonce',
      status: 'error'
    };

    fetch.mockResponseOnce(JSON.stringify({
      status: "success",
      error: "",
      nonce: Crypto.genCnonce(),
      cnonce: Crypto.genCnonce()
    }));

    fetch.mockRejectOnce(error);

    return api.fetchLogin(password, email).catch((err) => {
      expect(err).toEqual(error)
    });
  });

  it('should fetch the  pin', () => {
    const pin = '456123';
    const email = 'test';
    const password = 'password';
    const error = "";
    const jwt = "vRCcoVL8U0NwiUNDeP8Aru9P-dpVPEmh0ErkwRWGPBEGzcmUW4TnVU9g";
    const refreshToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9";
    const status = "success";
    const response = {
      error,
      jwt,
      refreshToken,
      status
    };

    fetch.mockResponse(JSON.stringify(response));
    api.fetchPin(pin, email).then((data) => {
      expect(data).toEqual(response);
    });
  });

  it('should handle errors when fetching the pin', () => {
    const pin = '456123';
    const email = 'test';
    const error = 'Failed to login';
    const jwt = "vRCcoVL8U0NwiUNDeP8Aru9P-dpVPEmh0ErkwRWGPBEGzcmUW4TnVU9g";
    const refreshToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9";
    const status = constants.ERROR_STATUS;
    const response = {
      error,
      jwt,
      refreshToken,
      status
    };
    fetch.mockResponse(JSON.stringify({ ...response }));

    return api.fetchPin(pin, email).catch(e => {
      expect(e.error).toMatch(error);
    });
  });

  it('hashes a password', () => {
    const pw = 'Password';
    const email = 'test';
    const nonce = Crypto.genCnonce();
    const cnonce = Crypto.genCnonce();
    fetch.mockResponse(JSON.stringify({ nonce: nonce, cnonce: cnonce }));
    expect.assertions(1);
    return api.hashPassword(pw, email).then((res) => {
      expect(res).not.toEqual('');
    })
  });

});





