import React from 'react';
import { ipValidator, ipAndPortValidator } from "./ip";

describe('ip validators', () => {
  it('valid IP address', () => {
    const { result, error } = ipValidator('127.0.0.0');

    expect(result).toEqual(true);
    expect(error).toBe(undefined);
  });

  it('invalid IP address string no port', () => {
    const { result, error } = ipValidator('111');

    expect(result).toEqual(false);
    expect(error).toBeDefined();
  });

  it('invalid IP address string with trailing colon', () => {
    const { result, error } = ipAndPortValidator('127.0.0.0:');

    expect(result).toEqual(false);
    expect(error).toBeDefined();
  });

  it('valid IP address string with valid port', () => {
    const { result, error } = ipAndPortValidator('127.0.0.0:1234');

    expect(result).toEqual(true);
    expect(error).toBeUndefined();
  });

  it('valid IP address string with invalid port', () => {
    const { result, error } = ipAndPortValidator('127.0.0.0:65536');

    expect(result).toEqual(false);
    expect(error).toBeDefined();
  });
});