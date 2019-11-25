import {NextFunction, Request, Response} from 'express';
import {asyncMiddleware} from '../middlewares/common';
import * as service from "./dr-service";
import {currentUserId} from "../common/helper";
import {CreateRequestDto} from "../dto/create-request-dto";

export const createRequest = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const params: CreateRequestDto = req.body;

        params.requesterId = currentUserId(req);
        const donationRequest = await service.createDonationRequest(params);

        res.status(201).json(donationRequest);
    }
);
