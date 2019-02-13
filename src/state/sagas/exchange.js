import {all, put, select, call, takeEvery} from 'redux-saga/effects';
import * as actions from '../actions/exchange';
import {convertCurrency} from '../../utils';
import {updatePocketBalance} from '../actions/pockets';
import {updateAmounts} from '../actions/exchange';

const convertCurrencySelector = (isReversed = false) => state => {
  const { exchange: { amountFrom, amountTo, currencyFrom, currencyTo }, exchangeRates } = state;
  const baseRate = exchangeRates[isReversed ? currencyTo : currencyFrom];
  const targetRate = exchangeRates[isReversed ? currencyFrom : currencyTo];
  const baseAmount = isReversed ? amountTo : amountFrom;
  console.log(`Converting ${baseAmount} with ${baseRate} to ${targetRate}`);
  return Math.round(convertCurrency(baseAmount, baseRate, targetRate));
};

export function* updateCurrencyFromSaga() {
  const { exchange: { amountTo, currencyFrom, currencyTo }, exchangeRates } = yield select();
  const converted = yield call(convertCurrency, amountTo, exchangeRates[currencyTo], exchangeRates[currencyFrom]);
  const amountFrom = yield call(Math.round, converted);
  yield put(actions.updateAmounts(amountFrom, amountTo));
}

export function* updateCurrencyToSaga() {
  const { exchange: { amountFrom, currencyFrom, currencyTo }, exchangeRates } = yield select();
  const converted = yield call(convertCurrency, amountFrom, exchangeRates[currencyFrom], exchangeRates[currencyTo]);
  const amountTo = yield call(Math.round, converted);
  yield put(actions.updateAmounts(amountFrom, amountTo));
}

export function* updateAmountToSaga(action) {
  const { exchange: { currencyFrom, currencyTo }, exchangeRates } = yield select();
  const converted = yield call(convertCurrency, action.amount, exchangeRates[currencyTo], exchangeRates[currencyFrom]);
  const amountFrom = yield call(Math.round, converted);
  yield put(actions.updateAmounts(amountFrom, action.amount));
}

export function* updateAmountFromSaga(action) {
  const { exchange: { currencyFrom, currencyTo }, exchangeRates } = yield select();
  const converted = yield call(convertCurrency, action.amount, exchangeRates[currencyFrom], exchangeRates[currencyTo]);
  const amountTo = yield call(Math.round, converted);
  yield put(actions.updateAmounts(action.amount, amountTo));
}

export function* exchangeBetweenPocketsSaga() {
  const { pockets, exchange: { amountFrom, currencyFrom, currencyTo } } = yield select();
  const amountTo = yield select(convertCurrencySelector());
  yield put(updatePocketBalance(currencyFrom, pockets[currencyFrom] - amountFrom));
  yield put(updatePocketBalance(currencyTo, pockets[currencyTo] + amountTo));
  yield put(updateAmounts(0, 0));
}

export default function* exchangeSaga() {
  yield all([
    takeEvery(actions.UPDATE_CURRENCY_FROM, updateCurrencyFromSaga),
    takeEvery(actions.UPDATE_CURRENCY_TO, updateCurrencyToSaga),
    takeEvery(actions.CHANGE_AMOUNT_FROM, updateAmountFromSaga),
    takeEvery(actions.CHANGE_AMOUNT_TO, updateAmountToSaga),
    takeEvery(actions.EXCHANGE_BETWEEN_POCKETS, exchangeBetweenPocketsSaga),
  ]);
}