import { NextFunction, Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { asyncMiddleware } from '../middlewares/common';
import * as service from "../service/donation-service";
import { currentUserId } from "../common/helper";
import Donation from '../models/donation';

export const createDonation = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const params: Donation = req.body;
        params.requesterId = currentUserId(req);

        const donation = await service.createDonation(params);
        const response = classToPlain(donation);

        res.status(201).json(response);
    }
);

export const getUserRequests = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const requests = await service.userRequests(userId);
        res.json(requests);
    }
);

export const getUserRequest = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, requestId } = req.params;
        const request = await service.userRequest(userId, requestId);
        if (!request) {
            return res.send(404);
        }
        res.json(request);
    }
);

export const searchDonors = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, requestId, offset = 0 } = req.params;
        const results = await service.searchDonors(userId, requestId, offset);
        res.json(results);
    }
)