import * as constants from 'redux-constants';
import { userAccount } from 'realm-crud';
export const saveUserAccountRequestAction = payload => {
  return {
    type: constants.USER_SAVE_ACCOUNT_REQUEST,
    payload
  };
};

export const saveUserAccountSuccessAction = payload => {
  return {
    type: constants.USER_SAVE_ACCOUNT_SUCCESS,
    payload
  };
};

export const saveUserAccountErrorAction = payload => {
  return {
    type: constants.USER_SAVE_ACCOUNT_ERROR,
    payload
  };
};

export const saveUserAccountThunk = payload => {
  return async dispatch => {
    dispatch(saveUserAccountRequestAction());
    try {
      await userAccount.saveUserAccount(payload);
      dispatch(saveUserAccountSuccessAction(payload));
    } catch (err) {
      dispatch(saveUserAccountErrorAction());
    }
  };
};
