import { createSelector } from 'reselect';
/**
 *
 * @param {object} state pass down the whole state
 */

//auth
export const getAuthState = state => {
  return state.auth;
};

export const getIsLoggedInState = state => {
  return getAuthState(state).isLoggedIn;
};

//langauge
export const getLanguageState = state => {
  return state.language;
};

export const getCurrentLanguageState = state => {
  return getLanguageState(state).currentLangauge;
};

export const getLanguageDirectionState = state => {
  return getLanguageState(state).languageDirection;
};

// user selectors
export const getUserState = state => {
  return state.auth.user;
};

export const getRealmUserIdState = state => {
  return getUserState(state).id;
};

export const getUserProfileState = state => {
  return getUserState(state).profile;
};

export const getUserEmailState = state => {
  return getUserProfileState(state).email;
};

export const getUserCustomDataState = state => {
  return getUserState(state).customData;
};

export const getUserCustomDataIdState = state => {
  return getUserCustomDataState(state)._id;
};

export const getUserCustomDataFullNameState = state => {
  return getUserCustomDataState(state).fullName.default;
};

export const getUserCustomDataDisplayNameState = state => {
  return getUserCustomDataState(state).displayName;
};

export const getUserCustomDataStoresState = state => {
  return getUserCustomDataState(state).stores;
};

export const getUserCustomDataStatusState = state => {
  return getUserCustomDataState(state).status;
};

export const getUserCustomDataPhoneState = state => {
  return getUserCustomDataState(state).phone;
};

export const getUserCustomDataCreatedAtState = state => {
  return getUserCustomDataState(state).createdAt;
};
