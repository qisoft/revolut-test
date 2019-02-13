import React from 'react';
import PropTypes from 'prop-types';
import {formatBalance} from '../utils';
import {DropdownCurrency} from './styled/DropdownCurrency';
import {CurrentCurrencyFlag} from './styled/CurrentCurrencyFlag';
import {DropdownCurrencyText} from './styled/DropdownCurrencyText';
import {DropdownBalanceText} from './styled/DropdownBalanceText';

const CurrencyDropdownItem = ({ currency, balance, onSelect }) => (
  <DropdownCurrency key={currency.code} onClick={() => onSelect(currency)}>
    <CurrentCurrencyFlag>
      <div className={`currency-flag currency-flag-xl currency-flag-${currency.code.toLowerCase()}`} />
    </CurrentCurrencyFlag>
    <DropdownCurrencyText>{ currency.code }</DropdownCurrencyText>
    <DropdownBalanceText>{ formatBalance(balance) } {currency.symbol}</DropdownBalanceText>
  </DropdownCurrency>
);

CurrencyDropdownItem.propTypes = {
  currency: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CurrencyDropdownItem;