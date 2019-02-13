import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {formatBalance} from '../utils';

const Balance = styled.div`
  font-size: 12px;
`;

export default class BalanceIndicator extends React.Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired
  };

  render() {
    const { balance, symbol } = this.props;
    return <Balance>
      Balance: { formatBalance(balance) } { symbol }
    </Balance>
  }
}