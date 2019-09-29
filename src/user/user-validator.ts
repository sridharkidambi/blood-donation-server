import { body, param } from 'express-validator';
import { validate } from '../middlewares/common';
import { getUserByEmail, getUserByPhoneNumber } from './user-service';

export const getUserValidator = validate(param('user_id').isNumeric());

export const registerUserValidator = validate(
    body('phoneNumber').isMobilePhone('en-IN'),
    body('emailAddress').isEmail(),
    body('firstName').isLength({ min: 3, max: 20 }),
    body('lastName')
        .optional()
        .isLength({ min: 3, max: 20 }),
    body('emailAddress')
        .custom(async value => {
            const user = await getUserByEmail(value);
            if (user) throw new Error();
            return true;
        })
        .withMessage('Given email is already registered'),
    body('phoneNumber')
        .custom(async value => {
            const user = await getUserByPhoneNumber(value);
            if (user) throw new Error();
            return true;
        })
        .withMessage('Given phone number is already registered'),
    body('otp').isLength({ min: 6, max: 6 })
);

export const updateUserValidator = validate(
    body('emailAddress')
        .isEmail()
        .optional(),
    body('firstName')
        .isLength({ min: 3, max: 20 })
        .optional(),
    body('lastName')
        .optional()
        .isLength({ min: 3, max: 20 })
);

export const loginValidator = validate(
    body('phoneNumber').isMobilePhone('en-IN'),
    body('otp').isLength({ min: 6, max: 6 })
);
