import { all } from 'redux-saga/effects';

import pocketsSaga from './pockets';
import exchangeRatesSaga from './exchangeRate';
import exchangeSaga from './exchange';

export default function* rootSaga() {
  yield all([
    pocketsSaga(),
    exchangeRatesSaga(),
    exchangeSaga(),
  ]);
}