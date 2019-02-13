const prefix = 'network_';
export const LOAD_FAIL = `${prefix}_loadFail`;
export const LOAD_SUCCESS = `${prefix}_loadSuccess`;

export const loadFail = (e) => ({ type: LOAD_FAIL, error: e });
export const loadSuccessful = () => ({ type: LOAD_SUCCESS });
