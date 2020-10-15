import React from 'react';
import { cl } from './classList';

describe('classList util functions', () => {
  it('builds a class list string properly', () => {
    let classes = { 'root': 'root-class-1' };

    let classNames = [{
      active: true,
      inactive: false
    }, 'asdf', 'root'];

    let classStr = cl(classNames, classes);
    expect(classStr).toEqual('active asdf root-class-1');
  });

});