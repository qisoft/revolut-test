import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import NumberFormat from 'react-number-format';
import BalanceIndicator from './BalanceIndicator';
import CurrencyDropdown from './CurrencyDropdown';
import {getPrecisionMultiplier, processAmountInput} from '../utils';
import {COLORS} from '../constants';

const PocketWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.isPlus ? COLORS.backgroundDark : COLORS.backgroundLight};
  padding: 20px;
`;

const AmountInput = styled.input`
  border: none;
  text-align: right;
  background: none;
  font-size: 32px;
  max-width: 100%;
  width: 100%;
  color: ${props => props.isValid ? COLORS.text : COLORS.errorText};
  &:focus {
    outline: none;
  }
`;

export default class Pocket extends React.Component {
  static propTypes = {
    isPlus: PropTypes.bool,
    isValid: PropTypes.bool,
    amount: PropTypes.number.isRequired,
    balances: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
    currencies: PropTypes.object.isRequired,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
  };

  static defaultProps = {
    isPlus: false,
    isValid: true,
    onAmountChange: () => {},
    onCurrencyChange: () => {},
  };

  onAmountChange = (e) => {
    const input = processAmountInput(e.floatValue || 0);
    this.props.onAmountChange(input);
  };

  render() {
    const {
      isPlus,
      amount,
      balances,
      currency,
      currencies,
      isValid,
      onCurrencyChange,
    } = this.props;
    const value = amount / getPrecisionMultiplier();
    return (
      <PocketWrapper isPlus={isPlus}>
        <div>
          <CurrencyDropdown
            currencies={currencies}
            balances={balances}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
          />
          <BalanceIndicator balance={balances[currency.code]} symbol={currency.symbol}/>
        </div>
        <NumberFormat
          value={value}
          fixedDecimalScale
          customInput={AmountInput}
          isValid={isValid}
          decimalScale={2}
          thousandSeparator=","
          allowNegative={false}
          prefix={isPlus ? '+ ' : '- '}
          onValueChange={this.onAmountChange}
        />
      </PocketWrapper>
    );
  }
}