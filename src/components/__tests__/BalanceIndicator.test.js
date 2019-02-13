import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BalanceIndicator from '../BalanceIndicator';
import * as utils from '../../utils';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../utils');

describe('Balance Indicator component', () => {
  const balance = 10000;
  const balanceString = balance.toString();
  const symbol = '$$$';
  utils.formatBalance
    .mockReturnValue(balanceString);

  const result = shallow(<BalanceIndicator balance={balance} symbol={symbol}/>);
  it('renders Balance styled component', () => {
    expect(result.find('BalanceIndicator__Balance')).toHaveLength(1);
  });
  it('renders Balance: text', () => {
    expect(result.find('BalanceIndicator__Balance').text()).toContain('Balance: ');
  });
  it('prints formatted balance with symbol', () => {
    expect(utils.formatBalance).toBeCalledWith(balance);
    expect(result.find('BalanceIndicator__Balance').text()).toContain(`${balanceString} ${symbol}`);
  });
});