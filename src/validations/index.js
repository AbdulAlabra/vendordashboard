import * as schema from './validations-schema';
import { formulateMessage } from 'helpers';

const response = validationResult => {
  const error = validationResult.error;
  if (error) {
    let message = formulateMessage(error.message);
    let objectKey = error.details[0].context.key;

    return { isValid: false, message, key: objectKey };
  } else {
    const data = validationResult.value;
    return { isValid: true, data };
  }
};

/**
 *
 * @param {Object} credentials credentials object containing email and password
 * @param {string}  credentials.email user email
 * @param {string}  credentials.password user password
 */

export const loginEmailPasswordValidate = credentials => {
  const result = schema.logInSchema.validate(credentials);
  return response(result);
};

/**
 *
 * @param {Object} credentials credentials object containing user info to sign up
 * @param {string}  credentials.firstName user first name
 * @param {string}  credentials.lastName user last name
 * @param {string}  credentials.phone user phone
 * @param {string}  credentials.email user email
 * @param {string}  credentials.password user password
 */

export const signUpEmailPasswordValidate = credentials => {
  const phoneNumber = schema.isNumberSchema.validate({
    phone: credentials.phone
  });
  if (phoneNumber.error) {
    return response(phoneNumber);
  } else {
    const result = schema.signUpSchema.validate(credentials);
    return response(result);
  }
};

export const emailValidate = (email = '') => {
  const result = schema.emailSchema.validate(email);
  return response(result);
};

export const passwordValidate = (password = '') => {
  const result = schema.passwordSchema.validate(password);
  return response(result);
};

export const saveUserAccountValidate = (userInfo = {}) => {
  const result = schema.saveUserAccountSchema.validate(userInfo);
  return response(result);
};
