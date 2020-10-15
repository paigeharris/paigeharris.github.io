import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import os from 'os';
import React from 'react';

import { APP_NAME } from "../../../../../config";
import { createDirUnderEngagement, createDirUnderApp } from './directory.utils';

configure({ adapter: new Adapter() });

describe('date.utils', () => {
  const engVal1 = { name: "Test Systems" };
  const engVal2 = { name: "TestSystems" };
  const testVal1 = "Reports Reports";
  const testVal2 = "ReportsReports";
  const correctVal1 = `${os.homedir()}/${APP_NAME}/TestSystems/ReportsReports`;
  const correctVal2 = `${os.homedir()}/${APP_NAME}/${testVal2}`;

  it('checks the return values of createDirUnderEngagement', () => {
    let d = createDirUnderEngagement(engVal1, testVal1);
    expect(d).toEqual(correctVal1);

    d = createDirUnderEngagement(engVal1, testVal2);
    expect(d).toEqual(correctVal1);

    d = createDirUnderEngagement(engVal2, testVal1);
    expect(d).toEqual(correctVal1);

    d = createDirUnderEngagement(engVal2, testVal2);
    expect(d).toEqual(correctVal1);
  });

  it('checks the return values of createDirUnderApp', () => {
    let d = createDirUnderApp(testVal1);
    expect(d).toEqual(correctVal2);

    d = createDirUnderApp(testVal2);
    expect(d).toEqual(correctVal2);
  });

});