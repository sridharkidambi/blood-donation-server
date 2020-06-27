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
        const userId: number = req.params.userId as number;
        const params: Donor = plainToClass(Donor, req.body as object);

        const user = await findUserById(userId);
        const isDonor = await user!.isDonor();
        if (isDonor) {
            throw HttpError.unprocessableEntity(
                ErrorCodes.alreadyExist,
                'User already registered for donation'
            );
        }
        await service.createDonor(params, userId);
        res.status(201).send(classToPlain(params));
    }
);

export const getDonor = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const donor = await service.getDonor(userId);
        if (!donor) {
            res.json(null);
        } else {
            res.json(donor);
        }
    }
)
