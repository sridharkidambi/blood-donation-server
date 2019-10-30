import {NextFunction, Request, Response} from 'express';
import {asyncMiddleware} from '../middlewares/common';
import * as service from "./hospital-service";

export const searchHospital = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.input;
        const location = req.query.location;

        const results = await service.searchHospitals(query, location);
        res.json(results);
    }
);

export const hospitalDetail = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const placeId = req.query.place_id;
        const hospital = await service.hospitalDetail(placeId);
        res.json(hospital);
    }
);