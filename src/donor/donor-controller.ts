import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import Donor from './donor';
import * as service from './donor-service';
import { asyncMiddleware } from '../middlewares/common';

export const createDonor = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const donorInfo = plainToClass(Donor, req.body);
        const userId = (req as any).payload.userId;

        await service.createDonor(donorInfo, userId);
        res.status(201).send(classToPlain(donorInfo));
    }
);
