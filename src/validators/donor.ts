import { validate } from '../middlewares/common';
import { body } from 'express-validator';
import Gender from '../models/gender';
import BloodType from '../models/blood-types';
import { getUserById } from '../service/user';
import { getValues } from '../utils';

const validGenders = getValues(Gender);
const validBloodTypes = getValues(BloodType);

export const createDonorValidator = validate(
    body('userId').isNumeric(),
    body('locality').isLength({ min: 3 }),
    body('state').isLength({ min: 3 }),
    body('pincode')
        .isNumeric()
        .isLength({ min: 6, max: 6 }),
    body('gender').isIn(validGenders),
    body('dob').isISO8601(),
    body('bloodType').isIn(validBloodTypes),
    body('longitude').isFloat(),
    body('latitude').isFloat(),
    body('userId').custom(async value => {
        const user = await getUserById(value);
        if (!user) {
            throw new Error('No user found for the given id');
        }
        const donor = await user.donor;
        if (donor) {
            throw new Error(
                'A donor profile is already present for this user. Maybe you wanted to update?'
            );
        }
        return true;
    })
);
