const prefix = 'pockets';
export const UPDATE_POCKET_BALANCE = `${prefix}updatePocketBalance`;
export const UPDATE_POCKETS_BALANCES = `${prefix}updatePocketsBalances`;
export const LOAD_POCKET_BALANCES = `${prefix}loadPocketBalances`;

export const updatePocketBalance = (currency, value) => ({ type: UPDATE_POCKET_BALANCE, currency, value });

export const loadPocketBalances = () => ({ type: LOAD_POCKET_BALANCES });

export const updatePocketsBalances = (balances) => {
  return ({ type: UPDATE_POCKETS_BALANCES, balances });
};
