import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorToast from '../ErrorToast';

Enzyme.configure({ adapter: new Adapter() });

describe('Error Toast component', () => {
  const errorMessage = 'test error';
  const result = shallow(<ErrorToast errorMessage={errorMessage} />);
  it('renders Toast styled component', () => {
    expect(result.find('ErrorToast__Toast')).toHaveLength(1);
  });
  it('renders error text', () => {
    expect(result.find('ErrorToast__Toast').text()).toContain(`Error: ${errorMessage}`);
  });
});