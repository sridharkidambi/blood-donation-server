import { validate } from '../middlewares/common';
import { body } from 'express-validator';

export const otpRequestValidator = validate(
    body('phoneNumber')
        .isMobilePhone('en-IN')
        .withMessage('Phone number is required for sending OTP')
);
