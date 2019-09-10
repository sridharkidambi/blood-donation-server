import { body } from 'express-validator';
import { validate } from '../middlewares/common';
import { getUserByEmail } from '../service/user';

export const createUserValidator = validate(
    body('emailAddress').isEmail(),
    body('password').isLength({ min: 6, max: 28 }),
    body('firstName').isLength({ min: 3, max: 20 }),
    body('lastName')
        .optional()
        .isLength({ min: 3, max: 20 }),
    body('emailAddress')
        .custom(async value => {
            const user = await getUserByEmail(value);
            if (user != null) throw new Error();
            return true;
        })
        .withMessage('Given email is already registered')
);

export const updateUserValidator = validate(
    body('emailAddress')
        .isEmail()
        .optional(),
    body('password')
        .isLength({ min: 6, max: 28 })
        .optional(),
    body('firstName')
        .isLength({ min: 3, max: 20 })
        .optional(),
    body('lastName')
        .optional()
        .isLength({ min: 3, max: 20 })
);

export const loginValidator = validate(
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 28 })
);
