import {NextFunction, Request, Response} from 'express';
import {asyncMiddleware} from '../middlewares/common';
import {searchHospitals} from "./hospital-service";

export const searchHospital = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query.input;
        const location = req.query.location;

        const results = await searchHospitals(query, location);
        res.json(results);
    }
);
