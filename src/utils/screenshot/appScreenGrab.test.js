import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import appScreenGrab from './appScreenGrab';

configure({ adapter: new Adapter() });

describe('appScreenGrab', () => {
  it('calls the appScreenGrab function and returns the empty Promise properly', () => {
    const path = appScreenGrab();
    expect(path).toEqual(Promise.resolve({}))
  });
});
