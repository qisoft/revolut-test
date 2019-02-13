import { takeEvery, call, put, all, select } from 'redux-saga/effects';
import * as actions from '../actions/pockets';
import { getPocketsBalances, savePocketsBalances } from '../../api/pockets';
import {loadFail, loadSuccessful} from '../actions/network';

function* loadPocketBalancesSaga() {
  try {
    const pocketBalances = yield call(getPocketsBalances);
    yield put(actions.updatePocketsBalances(pocketBalances));
    yield put(loadSuccessful());
  } catch (e) {
    yield put(loadFail(e));
  }
}

function* updatePocketBalanceSaga() {
  const pockets = yield select(state => state.pockets);
  yield call(savePocketsBalances, pockets);
}

export default function* pocketsSaga() {
  yield all([
    takeEvery(actions.LOAD_POCKET_BALANCES, loadPocketBalancesSaga),
    takeEvery(actions.UPDATE_POCKET_BALANCE, updatePocketBalanceSaga),
  ]);
}