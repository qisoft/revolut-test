const prefix = 'exchangeRate_';
export const LOAD_EXCHANGE_RATES = `${prefix}loadExchangeRates`;
export const UPDATE_EXCHANGE_RATES = `${prefix}updateExchangeRates`;
export const START_REFRESHING_RATES = `${prefix}startRefreshingRates`;

export const loadExchangeRates = () => ({ type: LOAD_EXCHANGE_RATES });
export const startRefreshingRates = () => ({ type: START_REFRESHING_RATES });
export const updateExchangeRates = (rates) => ({ type: UPDATE_EXCHANGE_RATES, rates });