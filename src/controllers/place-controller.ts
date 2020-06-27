import {NextFunction, Request, Response} from 'express';
import {asyncMiddleware} from '../middlewares/common';
import * as service from "../service/place-service";

export const searchPlace = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.input;
        const location = req.query.location;

        const results = await service.searchPlace(query, location);
        res.json(results);
    }
);

export const placeDetail = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const placeId = req.query.place_id;
        const place = await service.getPlace(placeId);
        res.json(place);
    }
);
