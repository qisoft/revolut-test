import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExchangeRateIndicator from '../ExchangeRateIndicator';
import * as utils from '../../utils';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../utils');

describe('Exchange Rate Indicator component', () => {
  const rate = 0.5;
  const rateString = rate.toString();
  const fromCurrencySymbol = "µ";
  const toCurrencySymbol = "$";
  utils.formatRate.mockReturnValue(rateString);
  const result = shallow(<ExchangeRateIndicator
    rate={rate}
    fromCurrencySymbol={fromCurrencySymbol}
    toCurrencySymbol={toCurrencySymbol}
  />);
  const pre = 'ExchangeRateIndicator__';
  it('renders ExchangeRateIndicatorWrapper styled component', () => {
    expect(result.find(`${pre}ExchangeRateIndicatorWrapper`)).toHaveLength(1);
  });
  it('renders IoIosTrendingUp Icon', () => {
    expect(result.find(`${pre}ExchangeRateIndicatorWrapper>IoIosTrendingUp`)).toHaveLength(1);
  });
  it('renders 1 of fromCurrency in Decimal', () => {
    expect(result.find(`${pre}ExchangeRateIndicatorWrapper>${pre}Decimal`).at(0).text())
      .toBe(`1 ${fromCurrencySymbol}`);
  });
  it('renders IoIosArrowRoundForward Icon', () => {
    expect(result.find(`${pre}ExchangeRateIndicatorWrapper>IoIosArrowRoundForward`)).toHaveLength(1);
  });
  it('renders formatted rate and symbol in Decimal', () => {
    expect(utils.formatRate).toBeCalledWith(rate);
    expect(result.find(`${pre}ExchangeRateIndicatorWrapper>${pre}Decimal`).at(1).text())
      .toBe(`${rate} ${toCurrencySymbol}`);
  })
});