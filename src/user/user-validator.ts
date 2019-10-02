import { body, param } from 'express-validator';
import { validate } from '../middlewares/common';
import { getUserByEmail, getUserByPhoneNumber } from './user-service';

export const getUserValidator = validate(param('user_id').isNumeric());

const phoneNumberValidator = body('phoneNumber').isMobilePhone('en-IN');

const uniquePhoneNumberValidator = body('phoneNumber')
    .isMobilePhone('en-IN')
    .custom(async value => {
        const user = await getUserByPhoneNumber(value);
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
        const user = await getUserByEmail(value);
        if (user) throw new Error();
        return true;
    })
    .withMessage('Given email is already registered');

const firstNameValidator = body('firstName').isLength({ min: 3, max: 20 });

const lastNameValidator = body('lastName')
    .optional()
    .isLength({ min: 3, max: 20 });

const passwordValidator = body('password').isLength({ min: 6, max: 100 });

export const registerUserValidator = validate(
    uniquePhoneNumberValidator,
    uniqueEmailValidator,
    firstNameValidator,
    lastNameValidator,
    passwordValidator
);

export const updateUserValidator = validate(
    firstNameValidator,
    lastNameValidator
);

export const loginValidator = validate(phoneNumberValidator, passwordValidator);
