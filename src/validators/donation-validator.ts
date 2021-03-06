import { body } from 'express-validator';
import { validate } from '../middlewares/common';
import { getValues } from "../common/utils";
import BloodGroup from "../models/blood-group";

const validBloodGroups = getValues(BloodGroup);

export const createDonationValidator = validate(
    body('patientName').isLength({ min: 3, max: 20 }),
    body('requiredBloodGroup').isIn(validBloodGroups),
    body('unitsRequired').isNumeric(),
    body('venue.gmapsId').exists(),
    // body('requiredOn').isISO8601().optional(),
    body('requiredAsap').isBoolean().optional(),
    body('attenderName').isLength({ min: 3, max: 20 }),
    body('attenderPhoneNumber').isLength({ max: 15, min: 10 })
);
