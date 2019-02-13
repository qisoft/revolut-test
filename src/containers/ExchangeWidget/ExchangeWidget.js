import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SUPPORTED_CURRENCIES } from '../../constants';
import {
  exchangeBetweenPockets,
  changeAmountFrom,
  changeAmountTo,
  updateCurrencyFrom,
  updateCurrencyTo,
  swapPockets,
} from '../../state/actions/exchange';
import { startRefreshingRates } from '../../state/actions/exchangeRate';
import { loadPocketBalances } from '../../state/actions/pockets';
import * as utils from '../../utils';

import Pocket from '../../components/Pocket';
import ExchangeRateIndicator from '../../components/ExchangeRateIndicator';
import SwapButton from '../../components/SwapButton';
import {getPrecisionMultiplier} from '../../utils';

const ExchangeWidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-order: 
`;

const FromPocketWrapper = styled.div`
  order: 1;
  flex: 1;
  display: flex;
`;

const ToPocketWrapper = styled.div`
  order: 3;
  flex: 1;
  display: flex;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: linear-gradient(to bottom, #ffffff 0%,#ffffff 50%,#eeeeee 51%,#eeeeee 100%);
  order: 2;
  padding: 0 15px;
`;

const ExchangeButton = styled.button`
  height: 40px;
  background: #D52F8A;
  border-radius: 20px;
  border: none;
  padding: 0 15px;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    background: #EFC4E2;
  }
`;

class ExchangeWidget extends React.Component {
  componentDidMount() {
    this.props.loadBalances();
    this.props.startRefreshingRates();
  }

  onSwapPockets = () => this.props.swapPockets();
  onCurrencyFromChange = currency => {
    if (currency.code === this.props.currencyTo.code) {
      this.onSwapPockets();
    } else {
      this.props.updateCurrencyFrom(currency.code);
    }
  };
  onCurrencyToChange = currency => {
    if (currency.code === this.props.currencyFrom.code) {
      this.onSwapPockets();
    } else {
      this.props.updateCurrencyTo(currency.code);
    }
  };

  renderPockets = () => {
    const {
      amountFrom,
      amountTo,
      balances,
      currencyFrom,
      currencyTo,
      changeAmountFrom,
      changeAmountTo,
    } = this.props;
    return (
      <React.Fragment>
        <FromPocketWrapper>
          <Pocket
            currencies={SUPPORTED_CURRENCIES}
            balances={balances}
            amount={amountFrom}
            currency={currencyFrom}
            onAmountChange={changeAmountFrom}
            onCurrencyChange={this.onCurrencyFromChange}
            isPlus={false}
            isValid={this.isValid()}
          />
        </FromPocketWrapper>
        <ToPocketWrapper>
          <Pocket
            currencies={SUPPORTED_CURRENCIES}
            balances={balances}
            amount={amountTo}
            currency={currencyTo}
            onCurrencyChange={this.onCurrencyToChange}
            isPlus
            onAmountChange={changeAmountTo}
          />
        </ToPocketWrapper>
    </React.Fragment>
    );
  };

  render() {
    const {
      currentExchangeRate,
      currencyFrom,
      currencyTo
    } = this.props;
    return (
      <ExchangeWidgetWrapper>
        { this.renderPockets() }
        <Separator>
          <SwapButton onClick={this.onSwapPockets} />
          <ExchangeRateIndicator
            fromCurrencySymbol={currencyFrom.symbol}
            toCurrencySymbol={currencyTo.symbol}
            rate={currentExchangeRate}/>
          <ExchangeButton
            disabled={!this.isValid()}
            onClick={() => this.props.exchangeBetweenPockets()}
          >
            Exchange
          </ExchangeButton>
        </Separator>
      </ExchangeWidgetWrapper>
    );
  }

  isValid = () => {
    const {
      amountFrom,
      balances,
      currencyFrom,
    } = this.props;
    return balances[currencyFrom.code] >= amountFrom;
  }
}

const mapStateToProps = ({ pockets, exchange, exchangeRates }) => ({
  balances: pockets,
  amountFrom: exchange.amountFrom,
  amountTo: exchange.amountTo,
  currencyFrom: SUPPORTED_CURRENCIES[exchange.currencyFrom],
  currencyTo: SUPPORTED_CURRENCIES[exchange.currencyTo],
  currentExchangeRate: utils.convertCurrency(
    1*getPrecisionMultiplier(),
    exchangeRates[exchange.currencyFrom],
    exchangeRates[exchange.currencyTo],
  ),
});

const mapDispatchToProps = dispatch => ({
  loadBalances: () => dispatch(loadPocketBalances()),
  exchangeBetweenPockets: () => dispatch(exchangeBetweenPockets()),
  changeAmountFrom: amount => dispatch(changeAmountFrom(amount)),
  changeAmountTo: amount => dispatch(changeAmountTo(amount)),
  updateCurrencyFrom: currency => dispatch(updateCurrencyFrom(currency)),
  updateCurrencyTo: currency => dispatch(updateCurrencyTo(currency)),
  startRefreshingRates: () => dispatch(startRefreshingRates()),
  swapPockets: () => dispatch(swapPockets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeWidget);