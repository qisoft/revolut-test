import { createReducer } from 'reduxsauce';
import { UPDATE_POCKET_BALANCE, UPDATE_POCKETS_BALANCES } from '../actions/pockets';
import { SUPPORTED_CURRENCIES } from '../../constants';
import { getPrecisionMultiplier } from '../../utils';

const updatePocketBalanceReducer = (state, action) => ({...state, [action.currency]: action.value });
const updatePocketsBalancesReducer = (state, action) => Object.keys(state)
  .map(currency => ({ currency, balance: action.balances[currency] || 1000 * getPrecisionMultiplier() }))
  .reduce((p, n) => ({...p, [n.currency]: n.balance}), {});

const INITIAL_STATE = Object.keys(SUPPORTED_CURRENCIES).reduce((p, n) => ({...p, [n]: 1000 * getPrecisionMultiplier() }), {});

export default createReducer(INITIAL_STATE, {
  [UPDATE_POCKET_BALANCE]: updatePocketBalanceReducer,
  [UPDATE_POCKETS_BALANCES]: updatePocketsBalancesReducer,
});