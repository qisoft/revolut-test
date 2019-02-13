import { createReducer } from 'reduxsauce';
import {SUPPORTED_CURRENCIES} from '../../constants';
import { UPDATE_EXCHANGE_RATES } from '../actions/exchangeRate';

const INITIAL_STATE = Object.keys(SUPPORTED_CURRENCIES).reduce((p, n) => ({...p, [n]: 1}), {});

const updateExchangeRatesReducer = (s, a) => a.rates;

export default createReducer(INITIAL_STATE, {
  [UPDATE_EXCHANGE_RATES]: updateExchangeRatesReducer,
});