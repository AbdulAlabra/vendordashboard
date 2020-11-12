import * as constants from 'redux-constants';
import {
  logInEmailPassword,
  isUserLoggedIn,
  logOutUser,
  sendResetUserPasswordEmail,
  createUserAccount,
  sendConfirmationEmail,
  confirmUserEmail,
  resetUserPassword
} from 'realm-crud/user-auth';
import * as messages from 'messages';

export const logInUserRequestAction = payload => {
  return {
    type: constants.LOGIN_USER_REQUEST,
    payload
  };
};

export const logInSuccessAction = payload => {
  return {
    type: constants.LOGIN_SUCCESS,
    payload
  };
};

export const logInUserRequestErrorAction = payload => {
  return {
    type: constants.LOGIN_USER_REQUEST_ERROR,
    payload
  };
};

export const logInEmailPasswordThunk = payload => {
  return async (dispatch, getState) => {
    dispatch(logInUserRequestAction());
    const authedUser = await logInEmailPassword(payload);
    if (authedUser.user) {
      dispatch(logInSuccessAction(authedUser));
      return authedUser;
    } else {
      dispatch(logInUserRequestErrorAction(authedUser));
      return authedUser;
    }
  };
};

// send email confimration
export const confirmUserEmailRequestAction = payload => {
  return {
    type: constants.CONFIRM_USER_EMAIL_REQUEST,
    payload
  };
};

export const confirmUserEmailSuccessAction = payload => {
  return {
    type: constants.CONFIRM_USER_EMAIL_SUCCESS,
    payload
  };
};

export const confirmUserEmailErrorAction = payload => {
  return {
    type: constants.CONFIRM_USER_EMAIL_ERROR,
    payload
  };
};

export const sendConfirmationEmailThunk = payload => {
  return async (dispatch, getState) => {
    dispatch(confirmUserEmailRequestAction());
    const result = await sendConfirmationEmail(payload);
    if (result.isEmailSent) {
      dispatch(confirmUserEmailSuccessAction(result));
      return result;
    } else {
      dispatch(confirmUserEmailErrorAction(result));
      return result;
    }
  };
};

// user email confirmation
export const tokenEmailVerifyRequestAction = payload => {
  return {
    type: constants.TOKEN_VERIFY_REQUEST,
    payload
  };
};

export const tokenVerifiedEmailSuccessAction = payload => {
  return {
    type: constants.TOKEN_VERIFY_SUCCESS,
    payload
  };
};

export const tokenVerifiedEmailErrorAction = payload => {
  return {
    type: constants.TOKEN_VERIFY_ERROR,
    payload
  };
};

export const tokenVerifyEmailThunk = payload => {
  return async (dispatch, getState) => {
    dispatch(tokenEmailVerifyRequestAction());
    const { token, tokenId } = payload;
    const result = await confirmUserEmail(token, tokenId);
    if (result.message === messages.user_email_confirmed) {
      dispatch(tokenVerifiedEmailSuccessAction(result));
      return result;
    } else {
      dispatch(tokenVerifiedEmailErrorAction(result));
      return result;
    }
  };
};

// sign up actions
export const signUpUserRequestAction = payload => {
  return {
    type: constants.SIGN_UP_USER_REQUEST,
    payload
  };
};

export const signUpUserRequestErrorAction = payload => {
  return {
    type: constants.SIGN_UP_USER_ERROR,
    payload
  };
};

export const signUpUserRequestSuccessAction = payload => {
  return {
    type: constants.SIGN_UP_USER_SUCCESS,
    payload
  };
};
/**
 *
 * @param {Object} payload user credentials object contain email, and password
 * @param {string} payload.email user email
 * @param {string} payload.password user password
 */
export const signUpThunk = payload => {
  return async (dispatch, getState) => {
    dispatch(signUpUserRequestAction());
    const newUser = await createUserAccount(payload);
    if (newUser.message === messages.sign_up_successfully) {
      dispatch(signUpUserRequestSuccessAction(newUser));
      return newUser;
    } else {
      dispatch(signUpUserRequestErrorAction(newUser));
      return newUser;
    }
  };
};

// logout actions
export const logOutAction = payload => {
  return {
    type: constants.LOGOUT,
    payload
  };
};

export const logOutThunk = () => {
  return async (dispatch, getState) => {
    await logOutUser();
    dispatch(logOutAction());
  };
};

// authrization actions
export const authorizeUserAction = payload => {
  return {
    type: constants.AUTHORIZE_USER_REQUEST,
    payload
  };
};

export const userAuthorizeSuccessAction = payload => {
  return {
    type: constants.AUTHORIZE_USER_SUCCESS,
    payload
  };
};

export const notAuthorizedUserAction = payload => {
  return {
    type: constants.NOT_AUTHORIZED_USER,
    payload
  };
};

export const authorizationRequestThunk = () => {
  return (dispatch, getState) => {
    dispatch(authorizeUserAction());
    const userObj = isUserLoggedIn();
    if (userObj.user) {
      dispatch(userAuthorizeSuccessAction(userObj));
      return userObj;
    } else {
      dispatch(notAuthorizedUserAction(userObj));
      return userObj;
    }
  };
};

// send reset password email actions
export const resetPasswordEmailRequestAction = payload => {
  return {
    type: constants.PASSWORD_RESET_EMAIL_REQUEST,
    payload
  };
};

export const resetPasswordEmailSentAction = payload => {
  return {
    type: constants.PASSWORD_RESET_EMAIL_SENT,
    payload
  };
};

export const resetPasswordEmailErrorAction = payload => {
  return {
    type: constants.PASSWORD_RESET_EMAIL_ERROR,
    payload
  };
};

export const sendPasswordResetEmailThunk = payload => {
  return async (dispatch, getState) => {
    dispatch(resetPasswordEmailRequestAction());
    const email = payload;
    const result = await sendResetUserPasswordEmail(email);
    if (result.isEmailSent) {
      dispatch(resetPasswordEmailSentAction(result));
      return result;
    } else {
      dispatch(resetPasswordEmailErrorAction(result));
      return result;
    }
  };
};

// reset password actions
export const resetPasswordRequestAction = payload => {
  return {
    type: constants.PASSWORD_RESET_REQUEST,
    payload
  };
};

export const resetPasswordSuccessAction = payload => {
  return {
    type: constants.PASSWORD_RESET_SUCCESS,
    payload
  };
};

export const resetPasswordErrorAction = payload => {
  return {
    type: constants.PASSWORD_RESET_ERROR,
    payload
  };
};

export const resetPasswordThunk = payload => {
  return async (dispatch, getState) => {
    dispatch(resetPasswordRequestAction());
    const { token, tokenId, password } = payload;
    const result = await resetUserPassword(token, tokenId, password);
    if (result.isPasswordReset) {
      dispatch(resetPasswordSuccessAction(result));
      return result;
    } else {
      dispatch(resetPasswordErrorAction(result));
      return result;
    }
  };
};
