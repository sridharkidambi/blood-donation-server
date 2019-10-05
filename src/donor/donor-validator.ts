import { validate } from '../middlewares/common';
import { body, header } from 'express-validator';
import Gender from '../models/gender';
import BloodType from '../models/blood-types';
import { getUserById } from '../user/user-service';
import { getValues } from '../common/utils';

const validGenders = getValues(Gender);
const validBloodTypes = getValues(BloodType);

export const createDonorValidator = validate(
    body('locality').isLength({ min: 3 }),
    body('state').isLength({ min: 3 }),
    body('pincode')
        .isNumeric()
        .isLength({ min: 6, max: 6 }),
    body('gender').isIn(validGenders),
    body('dob').isISO8601(),
    body('bloodType').isIn(validBloodTypes),
    body('location.longitude').isFloat(),
    body('location.latitude').isFloat()
);
