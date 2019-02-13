import { createReducer } from 'reduxsauce';
import { SUPPORTED_CURRENCIES } from '../../constants';
import * as actions from '../actions/exchange';

const currenciesIds = Object.keys(SUPPORTED_CURRENCIES);

const INITIAL_STATE = {
  currencyFrom: currenciesIds[0],
  currencyTo: currenciesIds[1],
  amountFrom: 0,
  amountTo: 0,
};

const updateFromCurrencyReducer = (state, action) => ({...state, currencyFrom: action.currency});
const updateToCurrencyReducer = (state, action) => ({...state, currencyTo: action.currency});
const updateAmountsReducer = (state, action) => ({
  ...state,
  amountFrom: action.amountFrom,
  amountTo: action.amountTo,
});
const swapPocketsReducer = (state) => ({
  currencyFrom: state.currencyTo,
  currencyTo: state.currencyFrom,
  amountFrom: state.amountTo,
  amountTo: state.amountFrom,
});

export default createReducer(INITIAL_STATE, {
  [actions.UPDATE_CURRENCY_FROM]: updateFromCurrencyReducer,
  [actions.UPDATE_CURRENCY_TO]: updateToCurrencyReducer,
  [actions.UPDATE_AMOUNTS]: updateAmountsReducer,
  [actions.SWAP_POCKETS]: swapPocketsReducer,
});