import {validate} from '../middlewares/common';
import {body} from 'express-validator';
import Gender from '../models/gender';
import BloodType from '../models/blood-types';
import {getValues} from '../common/utils';

const validGenders = getValues(Gender);
const validBloodTypes = getValues(BloodType);

export const createDonorValidator = validate(
    body('gender').isIn(validGenders),
    body('dob').isISO8601(),
    body('bloodType').isIn(validBloodTypes),
    body('address.street').isLength({min: 3}),
    body('address.landmark').isLength({min: 3}).optional(),
    body('address.area').isLength({min: 3}),
    body('address.city').isLength({min: 3}),
    body('address.state').isLength({min: 3}),
    body('address.country').isLength({min: 3}),
    body('address.pincode').isNumeric().isLength({min: 6, max: 6}),
    body('address.coordinate.latitude').isFloat(),
    body('address.coordinate.latitude').isFloat()
);
