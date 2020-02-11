import {NextFunction, Request, Response} from 'express';
import {asyncMiddleware} from '../middlewares/common';
import * as service from "../service/donation-service";
import {currentUserId} from "../common/helper";
import {CreateDonationDto} from "../models/create-donation-dto";

export const createRequest = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {

        const params: CreateDonationDto = req.body;
        params.requesterId = currentUserId(req);

        const donation = await service.createDonation(params);

        res.status(201).json(donation);
    }
);
