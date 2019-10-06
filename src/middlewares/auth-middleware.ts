import { Request, Response, NextFunction, Router } from 'express';
import HttpError from '../errors/http-error';
import { verifyToken } from '../auth';
import { ErrorMessage } from '../errors/ErrorCodes';

export const verify = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    try {
        const payload = await verifyToken(token);
        // make the payload accessible to the following middlewares
        (req as any).payload = payload;
        return next();
    } catch (errorCode) {
        const message: string = (ErrorMessage as any)[errorCode];
        const error = HttpError.unauthorized(errorCode, message);
        return next(error);
    }
};
