import { Request, Response, NextFunction, Router } from 'express';
import HttpError from '../errors/http-error';
import { verifyToken } from '../auth';

export const verify = (router: Router) => {
    router.use(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        try {
            const payload = await verifyToken(token);
            // make the payload accessible to the following middlewares
            (req as any).tokenPayload = payload;
            return next();
        } catch (e) {
            const error = new HttpError(401, e.message);
            return next(error);
        }
    });
};
