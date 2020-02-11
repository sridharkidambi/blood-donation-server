import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import Donor from '../models/donor';
import * as service from '../service/donor-service';
import { asyncMiddleware } from '../middlewares/common';
import { findUserById } from '../service/user-service';
import HttpError from '../errors/http-error';
import { ErrorCodes } from '../errors/error-codes';

export const createDonor = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const donorInfo = plainToClass(Donor, req.body);
        const userId = (req as any).payload.userId;

        const user = await findUserById(userId);
        if (user!.isDonor) {
            throw HttpError.unprocessableEntity(
                ErrorCodes.alreadyExist,
                'User already registered for donation'
            );
        }

        await service.createDonor(donorInfo, userId);
        res.status(201).send(classToPlain(donorInfo));
    }
);
