import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrencyDropdown from '../CurrencyDropdown';

Enzyme.configure({ adapter: new Adapter() });

describe('Currency Dropdown component', () => {
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
  const onCurrencyChanged = jest.fn();
  const result = shallow(<CurrencyDropdown
    currencies={currencies}
    balances={balances}
    currency={currency}
    onCurrencyChange={onCurrencyChanged}
  />);
  const pre = 'CurrencyDropdown__';
  it('renders CurrencyDropDownWrapper styled component', () => {
    expect(result.find(`${pre}CurrencyDropDownWrapper`)).toHaveLength(1);
  });

  it('renders current currency flag', () => {
    expect(result.find(`${pre}CurrencyDropDownWrapper>CurrentCurrencyFlag`))
      .toHaveLength(1);
    expect(result.find(`${pre}CurrencyDropDownWrapper>CurrentCurrencyFlag>div.currency-flag.currency-flag-${currency.code.toLowerCase()}`))
      .toHaveLength(1);
  });

  it('renders current currency code', () => {
    const codeWrapper = result.find(`${pre}CurrencyDropDownWrapper>${pre}CurrentCurrencyCode`);
    expect(codeWrapper)
      .toHaveLength(1);
    expect(codeWrapper.text()).toBe(currency.code);
  });

  it('renders down arrow', () => {
    expect(result.find(`${pre}CurrencyDropDownWrapper>IoMdArrowDropdown`)).toHaveLength(1);
  });

  it('renders dropdown', () => {
    expect(result.find(`${pre}Dropdown`)).toHaveLength(1);
  });

  it('opens dropdown on click on CurrencyDropDownWrapper', () => {
    const getDropdown = () => result.find(`${pre}Dropdown`);
    const getWrapper = () => result.find(`${pre}CurrencyDropDownWrapper`);
    expect(getDropdown().prop('isOpen')).toBe(false);
    getWrapper().simulate('click');
    expect(getDropdown().prop('isOpen')).toBe(true);
  });

  it('renders dropdown with CurrencyDropdownItem for each currency', () => {
    const items = result.find(`${pre}Dropdown>CurrencyDropdownItem`);
    expect(items)
      .toHaveLength(Object.keys(currencies).length);
    const eurItem = items.first();
    expect(eurItem.prop('balance')).toBe(balances.EUR);
    expect(eurItem.prop('currency')).toBe(currencies.EUR);
  });

  it('closes dropdown when element is selected', () => {
    const item = result.find(`${pre}Dropdown>CurrencyDropdownItem`).first();
    item.prop('onSelect')();
    expect(result.find(`${pre}Dropdown`).prop('isOpen')).toBe(false);
  });

  it('calls onCurrencyChange when element is selected', () => {
    const item = result.find(`${pre}Dropdown>CurrencyDropdownItem`).first();
    item.prop('onSelect')(currencies.EUR);
    expect(onCurrencyChanged).toBeCalledWith(currencies.EUR);
  });
});