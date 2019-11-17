import {NextFunction, Request, Response} from 'express';
import {plainToClass} from "class-transformer";
import {asyncMiddleware} from '../middlewares/common';
import * as service from "./dr-service";
import DonationRequest from "./dr-model";
import {currentUser} from "../common/helper";
import HttpError from "../errors/http-error";

export const createRequest = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const donationRequest = plainToClass(DonationRequest, req.body);
        const user = await currentUser(req);
        if (!user) {
            throw HttpError.unauthorized("UNAUTHORISED", "");
        }
        return await service.createDonationRequest(user, donationRequest);
    }
);

