import {
  logInEmailPassword,
  createUserAccount,
  sendResetUserPasswordEmail,
  sendConfirmationEmail
} from 'realm-crud/user-auth';
import * as messages from 'messages';

const newUserEmail = 'sdfgjshgfjhsg@yopmail.com';
const newUserPassword = '123456';

// logIn tests
test('logIn invalid email check', async () => {
  const userCredentials = {
    email: 'password',
    password: '123456'
  };
  const result = {
    user: undefined,
    message: messages.email_must_be_a_valid_email
  };
  const user = await logInEmailPassword(userCredentials);
  expect(user).toEqual(result);
});

test('logIn invalid password check', async () => {
  const userCredentials = {
    email: 'email@gmail.com',
    password: '12345'
  };
  const result = {
    user: undefined,
    message: messages.password_length_must_be_at_least_6_characters_long
  };
  const user = await logInEmailPassword(userCredentials);
  expect(user).toEqual(result);
});

test('logIn with wrong password or email', async () => {
  const userCredentials = {
    email: 'email@gmail.com',
    password: '123456'
  };
  const result = {
    user: undefined,
    message: messages.invalid_user_name_password
  };
  const user = await logInEmailPassword(userCredentials);
  expect(user).toEqual(result);
});

test('LogIn Empty email', async () => {
  const userCredentials = {
    email: '',
    password: '123456'
  };
  const result = {
    user: undefined,
    message: messages.email_is_not_allowed_to_be_empty
  };
  const user = await logInEmailPassword(userCredentials);
  expect(user).toEqual(result);
});

test('LogIn Empty password', async () => {
  const userCredentials = {
    email: 'kjshfkjs@gmail.com',
    password: ''
  };
  const result = {
    user: undefined,
    message: messages.password_is_not_allowed_to_be_empty
  };
  const user = await logInEmailPassword(userCredentials);
  expect(user).toEqual(result);
});

test('LogIn Successfully', async () => {
  const userCredentials = {
    email: 'abdulmohsen4484@hotmail.com',
    password: 'AbosaadAlabra123'
  };
  const user = await logInEmailPassword(userCredentials);
  expect(user.message).toEqual(messages.log_in_successfully);
});

//create an account tests
test('create new user wrong firstName', async () => {
  const mockedData = {
    firstName: 'ab',
    lastName: 'alab',
    phone: '27834687264',
    email: 'hkajsdha@dashdkjad.com',
    password: '123236'
  };
  const result = {
    message: messages.first_name_length_must_be_at_least_3_characters_long,
    isValid: false,
    key: 'firstName',
    user: undefined
  };
  const value = await createUserAccount(mockedData);

  expect(value).toEqual(result);
});

test('create new user wrong lastName', async () => {
  const mockedData = {
    firstName: 'abdul',
    lastName: 'd',
    phone: '27834687264',
    email: 'hkajsdha@dashdkjad.com',
    password: '123236'
  };
  const result = {
    message: messages.last_name_length_must_be_at_least_3_characters_long,
    isValid: false,
    key: 'lastName',
    user: undefined
  };
  const value = await createUserAccount(mockedData);

  expect(value).toEqual(result);
});

test('create new user wrong email', async () => {
  const mockedData = {
    firstName: 'abdul',
    lastName: 'alabra',
    phone: '27834687264',
    email: 'hkajsdhadashdkjad.com',
    password: '123236'
  };
  const result = {
    message: messages.email_must_be_a_valid_email,
    isValid: false,
    key: 'email',
    user: undefined
  };
  const value = await createUserAccount(mockedData);

  expect(value).toEqual(result);
});

test('create new user wrong password', async () => {
  const mockedData = {
    firstName: 'abdul',
    lastName: 'alabra',
    phone: '27834687264',
    email: 'hkajsdhad@ashdkjad.com',
    password: '123'
  };
  const result = {
    message: messages.password_length_must_be_at_least_6_characters_long,
    isValid: false,
    key: 'password',
    user: undefined
  };
  const value = await createUserAccount(mockedData);

  expect(value).toEqual(result);
});

test('create new user wrong phone', async () => {
  const mockedData = {
    firstName: 'abdul',
    lastName: 'alabra',
    phone: '264',
    email: 'hkajsdha@dashdkjad.com',
    password: '123236'
  };
  const result = {
    message: messages.phone_length_must_be_at_least_7_characters_long,
    isValid: false,
    key: 'phone',
    user: undefined
  };
  const value = await createUserAccount(mockedData);

  expect(value).toEqual(result);
});

test('create new user success', async () => {
  const mockedData = {
    firstName: 'abdul',
    lastName: 'alabra',
    phone: '26687488',
    email: newUserEmail,
    password: newUserPassword
  };

  const value = await createUserAccount(mockedData);

  expect(value.message).toEqual(messages.sign_up_successfully);
});

test('create new user already registered user', async () => {
  const mockedData = {
    firstName: 'abdul',
    lastName: 'alabra',
    phone: '26687488',
    email: 'sdkfjhkjsdf@fsjhgfs.com',
    password: '123236'
  };

  const value = await createUserAccount(mockedData);

  expect(value.message).toEqual(messages.already_registered_user);
});

// send reset password email
test('send reset password email not registered user', async () => {
  const mockedData = 'hgsdfhjgsdf@fgsjhfgjhsgfhjsgdf.com';
  const result = {
    isEmailSent: false,
    message: messages.user_not_found
  };
  const value = await sendResetUserPasswordEmail(mockedData);

  expect(value).toEqual(result);
});

test('send reset password email success', async () => {
  const mockedData = newUserEmail;
  const result = {
    isEmailSent: true,
    message: messages.email_is_sent_successfully
  };
  const value = await sendResetUserPasswordEmail(mockedData);

  expect(value).toEqual(result);
});

// send confirmation email
test('send confirmation email not registered user', async () => {
  const mockedData = 'hgsdfhjgsdf@fgsjhfgjhsgfhjsgdf.com';
  const result = {
    isEmailSent: false,
    message: messages.user_not_found
  };
  const value = await sendConfirmationEmail(mockedData);

  expect(value).toEqual(result);
});

test('send confirmation email success', async () => {
  const mockedData = newUserEmail;
  const result = true;
  const value = await sendConfirmationEmail(mockedData);

  expect(value.isEmailSent).toEqual(result);
});
