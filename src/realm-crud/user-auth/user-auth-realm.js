import * as Realm from 'realm-web';
import app from 'app-initialize';
import {
  log_in_successfully,
  user_not_found,
  something_went_wrong,
  invalid_user_name_password,
  email_is_sent_successfully,
  sign_up_successfully,
  already_registered_user,
  invalid_token,
  user_email_confirmed,
  already_confirmed,
  email_confirmation_is_required,
  password_reset_success
} from 'messages';
import {
  loginEmailPasswordValidate,
  emailValidate,
  signUpEmailPasswordValidate,
  passwordValidate
} from 'validations';
import { saveUserAccount } from '../user-account';

const defaultUserCredentials = {
  email: '',
  password: ''
};
const responseMessage = message => {
  switch (message) {
    case 'already confirmed':
      return already_confirmed;

    case 'confirmation required':
      return email_confirmation_is_required;

    case 'userpass token is expired or invalid':

    case 'invalid token data':
      return invalid_token;

    case 'invalid username/password':
      return invalid_user_name_password;

    case 'name already in use':
      return already_registered_user;

    case 'user not found':
      return user_not_found;

    case 'invalid username/password':
      return invalid_user_name_password;

    default:
      return something_went_wrong;
  }
};
/**
 *
 * @param {Object} userCredentials credentials object contain email, password
 * @param {string} userCredentials.email user email
 * @param {string} userCredentials.password user password
 */

export const logInEmailPassword = async (
  userCredentials = defaultUserCredentials
) => {
  let user;
  let message;
  const validation = loginEmailPasswordValidate(userCredentials);
  if (validation.isValid) {
    try {
      const { email, password } = validation.data;
      const credentials = Realm.Credentials.emailPassword(email, password);
      user = await app.logIn(credentials);
      message = log_in_successfully;
      return { user, message };
    } catch (err) {
      console.log(err);
      message = responseMessage(err.error);
      return { user, message };
    }
  } else {
    return { message: validation.message, user };
  }
};

export const isUserLoggedIn = () => {
  const user = app.currentUser;
  if (user) {
    return { user };
  } else {
    return { user: false };
  }
};

export const logOutUser = async () => {
  const user = app.currentUser;
  if (user) {
    return await user.logOut();
  } else {
    return user;
  }
};

export const createUserAccount = async userInfo => {
  const validation = signUpEmailPasswordValidate(userInfo);

  let user;
  let message;

  if (validation.isValid) {
    try {
      const { email, password } = validation.data;

      await app.emailPasswordAuth.registerUser(email, password);
      await saveUserAccount(validation.data);

      user = app.currentUser;
      message = sign_up_successfully;

      return { user, message };
    } catch (err) {
      console.log(err);

      message = responseMessage(err.error);
      const key = message === already_registered_user ? 'email' : undefined;

      return { user, message, key };
    }
  } else {
    return { user, ...validation };
  }
};

export const sendResetUserPasswordEmail = async email => {
  let message;
  const validation = emailValidate(email);
  if (validation.isValid) {
    try {
      const validEmailFormat = validation.data;
      await app.emailPasswordAuth.sendResetPasswordEmail(validEmailFormat);
      message = email_is_sent_successfully;
      return { isEmailSent: true, message };
    } catch (err) {
      console.error(err);
      message = responseMessage(err.error);
      return { isEmailSent: false, message };
    }
  } else {
    return { isEmailSent: false, message: validation.message };
  }
};

export const resetUserPassword = async (token, tokenId, password) => {
  let message;
  const validation = passwordValidate(password);
  if (validation.isValid) {
    try {
      await app.emailPasswordAuth.resetPassword(token, tokenId, password);
      message = password_reset_success;

      return { isPasswordReset: true, message };
    } catch (err) {
      console.error(err);
      message = responseMessage(err.error);
      return { isPasswordReset: false, message };
    }
  } else {
    return { isPasswordReset: false, message: validation.message };
  }
};

export const sendConfirmationEmail = async email => {
  let isEmailSent = false;
  let message;

  try {
    const validatoin = emailValidate(email);
    if (validatoin.isValid) {
      const validEmailFormat = validatoin.data;
      await app.emailPasswordAuth.resendConfirmationEmail(validEmailFormat);
      isEmailSent = true;
      return { isEmailSent, message };
    } else {
      return { isEmailSent: false, ...validatoin };
    }
  } catch (err) {
    console.log(err);
    message = responseMessage(err.error);
    return { isEmailSent, message };
  }
};

export const confirmUserEmail = async (token, tokenId) => {
  let user;
  let message;
  try {
    const result = await app.emailPasswordAuth.confirmUser(token, tokenId);
    user = result;
    message = user_email_confirmed;
    return { user, message };
  } catch (err) {
    console.log(err);
    message = responseMessage(err.error);
    return { user, message };
  }
};
