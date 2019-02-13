import { all, call, select, takeEvery, put, delay } from 'redux-saga/effects';
import * as actions from '../actions/exchangeRate';
import { loadSuccessful, loadFail } from '../actions/network';
import { getExchangeRates } from '../../api/exchangeRate';
import { changeAmountFrom } from '../actions/exchange';
import config from '../../config';

export function* loadExchangeRatesSaga() {
  try {
    const rates = yield call(getExchangeRates);
    yield put(actions.updateExchangeRates(rates));
    yield put(loadSuccessful());
  } catch (e) {
    yield put(loadFail(e.message));
  }
}

function* startRefreshingRatesSaga() {
  while (true) {
    yield put(actions.loadExchangeRates());
    yield delay(config.refreshRate);
  }
}

function* updateExchangeRatesSaga() {
  // update amount based on new rates
  const amountFrom = yield select(state => state.exchange.amountFrom);
  yield put(changeAmountFrom(amountFrom));
}

export default function* pocketsSaga() {
  yield all([
    takeEvery(actions.LOAD_EXCHANGE_RATES, loadExchangeRatesSaga),
    takeEvery(actions.START_REFRESHING_RATES, startRefreshingRatesSaga),
    takeEvery(actions.UPDATE_EXCHANGE_RATES, updateExchangeRatesSaga),
  ]);
}