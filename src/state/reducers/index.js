import { combineReducers } from 'redux';
import exchangeRatesReducer from './exchangeRate';
import pocketsReducer from './pockets';
import exchangeReducer from './exchange';
import networkReducer from './network';

export default combineReducers({
  exchangeRates: exchangeRatesReducer,
  pockets: pocketsReducer,
  exchange: exchangeReducer,
  network: networkReducer,
});