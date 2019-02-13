const prefix = 'exchange_';
export const EXCHANGE_BETWEEN_POCKETS = `${prefix}exchangeBetweenPockets`;
export const UPDATE_CURRENCY_FROM = `${prefix}updateCurrencyFrom`;
export const UPDATE_CURRENCY_TO = `${prefix}updateCurrencyTo`;
export const CHANGE_AMOUNT_FROM = `${prefix}changeAmountFrom`;
export const CHANGE_AMOUNT_TO = `${prefix}changeAmountTo`;
export const UPDATE_AMOUNTS = `${prefix}updateAmounts`;
export const SWAP_POCKETS = `${prefix}swapPockets`;

export const exchangeBetweenPockets = () => ({ type: EXCHANGE_BETWEEN_POCKETS });
export const updateCurrencyFrom = (currency) => ({ type: UPDATE_CURRENCY_FROM, currency });
export const updateCurrencyTo = (currency) => ({ type: UPDATE_CURRENCY_TO, currency });
export const changeAmountFrom = (amount) => ({ type: CHANGE_AMOUNT_FROM, amount });
export const changeAmountTo = (amount) => ({ type: CHANGE_AMOUNT_TO, amount });
export const updateAmounts = (amountFrom, amountTo) => ({ type: UPDATE_AMOUNTS, amountFrom, amountTo });
export const swapPockets = () => ({ type: SWAP_POCKETS });