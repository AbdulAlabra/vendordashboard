import joi, { date } from 'joi';
import ObjectId from 'bson-objectid';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

export const emailSchema = joi
  .string()
  .trim()
  .email({ tlds: { allow: false } })
  .required();

export const passwordSchema = joi
  .string()
  .min(6)
  .required();
export const isNumberSchema = joi.object({
  phone: joi.number().required()
});

export const logInSchema = joi.object({
  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),

  password: joi
    .string()
    .min(6)
    .required()
});

export const signUpSchema = joi.object({
  firstName: joi
    .string()
    .trim()
    .min(3)
    .max(30)
    .required(),

  lastName: joi
    .string()
    .trim()
    .min(3)
    .max(20)
    .required(),

  phone: joi
    .string()
    .trim()
    .min(7)
    .max(20)
    .required(),

  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .min(6)
    .required()
});

export const saveUserAccountSchema = joi.object({
  // _id: joi
  //   .custom(value => {
  //     let hexString = ObjectId(value).toHexString();
  //     return ObjectId(hexString);
  //   })
  //   .default(ObjectId()),
  fullName: {
    default: joi.string(),
    defaultLanguage: {
      language: joi.string(),
      languageCode: joi.string()
    },
    translations: joi.array().default([])
  },
  displayName: joi
    .string()
    .trim()
    .min(3)
    .max(20)
    .required(),
  email: joi
    .string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  phone: joi
    .string()
    .trim()
    .min(7)
    .max(20)
    .required(),
  sellerType: joi.array().default([]),
  status: joi.string().default('new'),
  stores: joi.array().default([]),
  createdAt: joi.number().default(dayjs().unix())
});
