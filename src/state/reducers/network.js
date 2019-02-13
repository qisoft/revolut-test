import { createReducer } from 'reduxsauce';
import { LOAD_FAIL, LOAD_SUCCESS } from '../actions/network';

const loadFailReducer = (state, action) => ({...state, error: action.error });
const loadSuccessReducer = (state) => ({...state, error: null });

const INITIAL_STATE = {
  error: null,
};

export default createReducer(INITIAL_STATE, {
  [LOAD_FAIL]: loadFailReducer,
  [LOAD_SUCCESS]: loadSuccessReducer,
});