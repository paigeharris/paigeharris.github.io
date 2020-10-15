import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import moment from 'moment';
import React from 'react';

import {
  timestamp
} from './date.utils';

configure({ adapter: new Adapter() });

//todo
describe('date.utils', () => {
  it('builds a timestamp', () => {
  });

  it('only shows the time in a timestamp', () => {
  });

  it('only shows the date in the timestamp', () => {
  });
});
