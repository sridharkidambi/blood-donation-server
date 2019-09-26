import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import Donor from '../models/donor';
import * as service from '../service/donor-service';
import { asyncMiddleware } from '../middlewares/common';

export const createDonor = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const donor = plainToClass(Donor, req.body);
        await service.createDonor(donor, req.body.userId);
        res.status(201).send(classToPlain(donor));
    }
);
