import * as constants from 'redux-constants';
import i18next from 'translations-i18next';
import { getCurrentLanguageState } from 'redux-selectors';
/**
 *
 * @param {Object} payload the langauge object
 * @param {string} payload.newLanguage the new langauge symbol that you want to chnage to such as ar, en
 */

export const chnageLnagugeAction = payload => {
  return {
    type: constants.CHANGE_LANGUAGE,
    payload
  };
};

export const chnageLnagugeErrorAction = payload => {
  return {
    type: constants.CHANGE_LANGUAGE_ERROR,
    payload
  };
};

export const chnageLnagugeThunk = payload => {
  return async (dispatch, getState) => {
    try {
      await i18next.changeLanguage(payload.newLanguage);
    } catch (error) {
      console.log(error);
      dispatch(chnageLnagugeErrorAction());
    }
  };
};
