import { emailValidate } from 'validations';

test('validation-wrong-email', async () => {
  const email = 'fhjsdgfjhgsfgjhsf';
  const checkEmail = emailValidate(email).isValid;
  const result = false;
  expect(checkEmail).toEqual(result);
});

test('validation-undefined-email', async () => {
  const email = undefined;
  const checkEmail = emailValidate(email).isValid;
  const result = false;
  expect(checkEmail).toEqual(result);
});

test('validation-right-email', async () => {
  const email = 'djsh@kjhf.com';
  const checkEmail = emailValidate(email).isValid;
  const result = true;
  console.log(checkEmail);
  expect(checkEmail).toEqual(result);
});
