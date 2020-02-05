import { body, param } from 'express-validator';
import { validate } from '../middlewares/common';
import { findUserByEmail, findUserByPhoneNumber } from '../service/user-service';

export const getUserValidator = validate(param('user_id').isNumeric());

const phoneNumberValidator = body('phoneNumber').isMobilePhone('en-IN');

const uniquePhoneNumberValidator = body('phoneNumber')
    .isMobilePhone('en-IN')
    .custom(async value => {
        const user = await findUserByPhoneNumber(value);
        if (user) throw new Error();
        return true;
    })
    .withMessage('Given phone number is already registered');

const emailValidator = body('emailAddress')
    .isEmail()
    .withMessage('Invalid email address');

const uniqueEmailValidator = body('emailAddress')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async value => {
        const user = await findUserByEmail(value);
        if (user) throw new Error();
        return true;
    })
    .withMessage('Given email is already registered');

const nameValidator = body('name').isLength({ min: 3, max: 20 });

const passwordValidator = body('password').isLength({ min: 6, max: 100 });

export const registerUserValidator = validate(
    uniquePhoneNumberValidator,
    uniqueEmailValidator,
    nameValidator,
    passwordValidator
);

export const updateUserValidator = validate(nameValidator);

export const loginValidator = validate(phoneNumberValidator, passwordValidator);
