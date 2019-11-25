import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import Donor from './donor-model';
import * as service from './donor-service';
import { asyncMiddleware } from '../middlewares/common';
import { findUserById } from '../user/user-service';
import HttpError from '../errors/http-error';
import { ErrorCodes } from '../errors/error-codes';

export const createDonor = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const donorInfo = plainToClass(Donor, req.body);
        const userId = (req as any).payload.userId;

        const user = await findUserById(userId);
        if (await user!.isDonor()) {
            throw HttpError.unprocessableEntity(
                ErrorCodes.alreadyExist,
                'Already registered for donation'
            );
        }

        await service.createDonor(donorInfo, userId);
        res.status(201).send(classToPlain(donorInfo));
    }
);
