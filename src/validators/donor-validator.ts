import {validate} from '../middlewares/common';
import {body} from 'express-validator';
import Gender from '../models/gender';
import BloodType from '../models/blood-group';
import {getValues} from '../common/utils';

const validGenders = getValues(Gender);
const validBloodTypes = getValues(BloodType);

export const createDonorValidator = validate(
    body('gender').isIn(validGenders),
    body('dob').isISO8601(),
    body('bloodGroup').isIn(validBloodTypes),
    body('residence.gmapsId').not().isEmpty()
);
