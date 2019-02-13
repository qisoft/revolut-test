import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import 'currency-flags/dist/currency-flags.css';
import {IoMdArrowDropdown} from 'react-icons/io';
import {CurrentCurrencyFlag} from './styled/CurrentCurrencyFlag';
import CurrencyDropdownItem from './CurrencyDropdownItem';
import {COLORS} from '../constants';

const CurrencyDropDownWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  & > * {
    margin: 5px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  height: 300px;
  width: 300px;
  overflow: auto;
  background: ${COLORS.backgroundLight};
  border: 1px solid ${COLORS.backgroundDark};
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -150px;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
`;

const CurrentCurrencyCode = styled.div`
  font-size: 32px;
`;

export default class CurrencyDropdown extends React.Component {
  static propTypes = {
    currencies: PropTypes.object.isRequired,
    balances: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
  };
  state = {
    isDropdownOpen: false,
  };

  openDropdown = () => !this.state.isDropdownOpen && this.setState({ isDropdownOpen: true });

  onCurrencyChange = (currency) => {
    this.props.onCurrencyChange(currency);
    this.setState({ isDropdownOpen: false });
  };

  renderDropdown = () => {
    const { currencies, balances } = this.props;
    const currenciesDropdownItems = Object.keys(currencies).map(code => {
      const currency = currencies[code];
      const balance = balances[code];
      return (
        <CurrencyDropdownItem
          key={code}
          currency={currency}
          balance={balance}
          onSelect={this.onCurrencyChange}
        />
      );
    });
    return (
      <Dropdown isOpen={this.state.isDropdownOpen}>
        {currenciesDropdownItems}
      </Dropdown>
    );
  };

  render() {
    const { currency } = this.props;
    return (
      <React.Fragment>
        <CurrencyDropDownWrapper onClick={this.openDropdown}>
          <CurrentCurrencyFlag>
            <div className={`currency-flag currency-flag-xl currency-flag-${currency.code.toLowerCase()}`} />
          </CurrentCurrencyFlag>
          <CurrentCurrencyCode>{currency.code}</CurrentCurrencyCode>
          <IoMdArrowDropdown/>
        </CurrencyDropDownWrapper>
        { this.renderDropdown() }
      </React.Fragment>
    );
  }
}