import axios from 'axios';
import { detectLanguage } from 'helpers';
import { saveUserAccountValidate } from 'validations';
import * as messages from 'messages';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

export const saveUserAccount = async (userInfo = {}) => {
  const { REACT_APP_REALM_SERVICE_SAVE_NEW_USER } = process.env;
  let message;
  let result;

  try {
    let { firstName, lastName, phone, email } = userInfo;
    let dataToSave = {
      fullName: {
        default: `${firstName} ${lastName}`,
        defaultLanguage: detectLanguage(`${firstName} ${lastName}`)
      },
      displayName: firstName,
      phone,
      email
    };
    let validation = saveUserAccountValidate(dataToSave);
    result = await axios.post(
      REACT_APP_REALM_SERVICE_SAVE_NEW_USER,
      validation.data
    );
    result = result.data.result;
    message = messages.user_account_has_been_saved;
  } catch (err) {
    console.log(err);
    message = messages.something_went_wrong;
  }

  return { result, message };
};
