import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrencyDropdownItem from '../CurrencyDropdownItem';
import * as utils from '../../utils';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../utils');

describe('Currency Dropdown Item component', () => {
  const balance = 100000;
  const balanceString = balance.toString();
  const currency = {
    code: 'EUR',
    symbol: 'eu',
  };
  const onSelect = jest.fn();
  utils.formatBalance
    .mockReturnValue(balanceString);

  const result = shallow(<CurrencyDropdownItem
    balance={balance}
    currency={currency}
    onSelect={onSelect}
  />);

  it('renders DropdownCurrency styled component', () => {
    expect(result.find(`DropdownCurrency`)).toHaveLength(1);
  });

  it('renders currency flag', () => {
    expect(result.find(`DropdownCurrency>CurrentCurrencyFlag`))
      .toHaveLength(1);
    expect(result.find(`DropdownCurrency>CurrentCurrencyFlag>div.currency-flag.currency-flag-${currency.code.toLowerCase()}`))
      .toHaveLength(1);
  });

  it('renders currency code', () => {
    const codeWrapper = result.find(`DropdownCurrency>DropdownCurrencyText`);
    expect(codeWrapper)
      .toHaveLength(1);
    expect(codeWrapper.text()).toBe(currency.code);
  });

  it('renders formatted balance with symbol', () => {
    const balanceWrapper = result.find(`DropdownCurrency>DropdownBalanceText`);
    expect(balanceWrapper)
      .toHaveLength(1);
    expect(utils.formatBalance).toBeCalledWith(balance);
    expect(balanceWrapper.text()).toContain(`${balanceString} ${currency.symbol}`);
  });

  it('calls onSelect with currency when user clicks on DropdownCurrency div', () => {
    result.find(`DropdownCurrency`).simulate('click');
    expect(onSelect).toBeCalledWith(currency);
  })
});