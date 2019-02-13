import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SwapButton from '../SwapButton';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../utils');

describe('Swap Button component', () => {
  const onClick = jest.fn();

  const result = shallow(<SwapButton onClick={onClick} />);
  it('renders Button styled component', () => {
    expect(result.find('SwapButton__Button')).toHaveLength(1);
  });
  it('renders Repeat Icon', () => {
    expect(result.find('SwapButton__Button>IoIosRepeat')).toHaveLength(1);
  });
  it('calls onClick when user clicks Button', () => {
    result.find('SwapButton__Button').simulate('click');
    expect(onClick).toBeCalled();
  });
});