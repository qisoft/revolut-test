import React from 'react';
import PropTypes from 'prop-types';
import { IoIosTrendingUp, IoIosArrowRoundForward } from 'react-icons/io';
import styled from 'styled-components/macro';
import { formatRate } from '../utils';

const ExchangeRateIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 15px;
  border: 2px solid #eeeeee;
  height: 30px;
  padding: 0 10px;
`;

const Decimal = styled.div`
  font-size: 14px;
  padding: 0 5px;
`;

export default class ExchangeRateIndicator extends React.Component {
  static propTypes = {
    fromCurrencySymbol: PropTypes.string.isRequired,
    toCurrencySymbol: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
  };

  render() {
    const { fromCurrencySymbol, toCurrencySymbol, rate } = this.props;
    return (
      <ExchangeRateIndicatorWrapper>
        <IoIosTrendingUp/>
        <Decimal>1 {fromCurrencySymbol}</Decimal>
        <IoIosArrowRoundForward/>
        <Decimal>{formatRate(rate)} {toCurrencySymbol}</Decimal>
      </ExchangeRateIndicatorWrapper>
    );
  }
}