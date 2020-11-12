import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_USER_REQUEST,
  LOGIN_USER_REQUEST_ERROR,
  CONFIRM_USER_EMAIL_REQUEST,
  CONFIRM_USER_EMAIL_SUCCESS,
  CONFIRM_USER_EMAIL_ERROR,
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_ERROR,
  AUTHORIZE_USER_REQUEST,
  AUTHORIZE_USER_SUCCESS,
  NOT_AUTHORIZED_USER,
  PASSWORD_RESET_EMAIL_REQUEST,
  PASSWORD_RESET_EMAIL_SENT,
  PASSWORD_RESET_EMAIL_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  TOKEN_VERIFY_REQUEST,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_ERROR,
  USER_SAVE_ACCOUNT_REQUEST,
  USER_SAVE_ACCOUNT_SUCCESS,
  USER_SAVE_ACCOUNT_ERROR
} from 'redux-constants';

const initialState = {
  isLoggedIn: false,
  isFetchingUser: false,
  isAuthError: false,
  isPasswordResetSuccess: false,
  isResetPasswordEmailSent: false,
  isEmailConfirmed: false,
  isEmailConfirmationSent: false,
  isSignedUp: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case PASSWORD_RESET_EMAIL_REQUEST:
    case SIGN_UP_USER_REQUEST:
    case TOKEN_VERIFY_REQUEST:
    case PASSWORD_RESET_REQUEST:
    case USER_SAVE_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetchingUser: true,
        isLoggedIn: false,
        isSignedUp: false,
        isEmailConfirmed: false,
        isEmailConfirmationSent: false,
        isAuthError: false,
        isResetPasswordEmailSent: false,
        isPasswordResetSuccess: false,
        message: ''
      };

    case CONFIRM_USER_EMAIL_REQUEST:
      return {
        ...state,
        isFetchingUser: true,
        isEmailConfirmationSent: false
      };

    case LOGIN_SUCCESS:
    case AUTHORIZE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetchingUser: false,
        isAuthError: false,
        isLoggedIn: true
      };

    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthError: false,
        isFetchingUser: false,
        isSignedUp: true
      };

    case CONFIRM_USER_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetchingUser: false,
        isAuthError: false,
        isEmailConfirmationSent: true
      };

    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        isAuthError: false,
        isPasswordResetSuccess: true
      };

    case TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isEmailConfirmed: true,
        isAuthError: false
      };

    case TOKEN_VERIFY_ERROR:
      return {
        ...state,
        ...action.payload,
        isEmailConfirmed: false,
        isFetchingUser: false
      };

    case USER_SAVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isAuthError: false
      };

    case PASSWORD_RESET_EMAIL_SENT:
      return {
        ...state,
        isFetchingUser: false,
        isResetPasswordEmailSent: true
      };

    case PASSWORD_RESET_EMAIL_ERROR:
    case SIGN_UP_USER_ERROR:
    case CONFIRM_USER_EMAIL_ERROR:
    case PASSWORD_RESET_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthError: true,
        isEmailConfirmationSent: false,
        isFetchingUser: false
      };

    case LOGIN_USER_REQUEST_ERROR:
    case USER_SAVE_ACCOUNT_ERROR:
      return {
        ...state,
        ...action.payload,
        isAuthError: true,
        isFetchingUser: false
      };
    case NOT_AUTHORIZED_USER:
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
