import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pocket from '../Pocket';
import * as utils from '../../utils';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../utils');

describe('Pocket component', () => {
  const isPlus = true;
  const amount = 10000;
  const amountString = amount.toString();
  const multiplier = 100;
  const currencies = {
    'EUR': {
      code: 'EUR',
      symbol: 'eu',
    },
    'USD': {
      code: 'USD',
      symbol: '$'
    }
  };
  const balances = {
    'EUR': 10000,
    'USD': 50000,
  };
  const currency = currencies.EUR;
  const isValid = true;
  const onCurrencyChange = jest.fn();
  const onAmountChange = jest.fn();
  utils.formatBalance
    .mockReturnValue(amountString);
  utils.processAmountInput
    .mockReturnValue(amount);
  utils.getPrecisionMultiplier
    .mockReturnValue(multiplier);

  const result = shallow(<Pocket
      currency={currency}
      balances={balances}
      currencies={currencies}
      amount={amount}
      onCurrencyChange={onCurrencyChange}
      isPlus={isPlus}
      onAmountChange={onAmountChange}
      isValid={isValid}
    />);
  it('renders PocketWrapper styled component', () => {
    expect(result.find('Pocket__PocketWrapper')).toHaveLength(1);
    expect(result.find('Pocket__PocketWrapper').prop('isPlus')).toBe(isPlus);
  });
  it('renders CurrencyDropdown with correct props', () => {
    const currencyDropdown = result.find('Pocket__PocketWrapper CurrencyDropdown');
    expect(currencyDropdown).toHaveLength(1);
    expect(currencyDropdown.prop('currencies')).toBe(currencies);
    expect(currencyDropdown.prop('balances')).toBe(balances);
    expect(currencyDropdown.prop('currency')).toBe(currency);
    expect(currencyDropdown.prop('onCurrencyChange')).toBe(onCurrencyChange);
  });
  it('renders Balance Indicator with correct props', () => {
    const balanceIndicator = result.find('Pocket__PocketWrapper BalanceIndicator');
    expect(balanceIndicator).toHaveLength(1);
    expect(balanceIndicator.prop('balance')).toBe(balances[currency.code]);
    expect(balanceIndicator.prop('symbol')).toBe(currency.symbol);
  });
  it('renders NumberFormat with correct props', () => {
    const numberFormat = result.find('Pocket__PocketWrapper NumberFormat');
    expect(numberFormat).toHaveLength(1);
    expect(utils.getPrecisionMultiplier).toBeCalled();
    expect(numberFormat.prop('value')).toBe(amount / multiplier);
    expect(numberFormat.prop('isValid')).toBe(isValid);
    expect(numberFormat.prop('decimalScale')).toBe(2);
    expect(numberFormat.prop('thousandSeparator')).toBe(',');
    expect(numberFormat.prop('allowNegative')).toBe(false);
    expect(numberFormat.prop('prefix')).toBe(isPlus ? '+ ' : '- ');
    expect(numberFormat.prop('onValueChange')).toBe(result.instance().onAmountChange);
  });
});