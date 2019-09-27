import { Request, Response, NextFunction, Router } from 'express';
import ErrorResponse from '../models/error-response';
import HttpError from '../errors/http-error';
import config from '../config';

// this is the last middleware and hence is the right place to handle
// 404 error
const handle404Error = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        throw new HttpError(404, 'Method not found.');
    });
};

const handleError = (router: Router) => {
    router.use(
        (error: Error, req: Request, res: Response, next: NextFunction) => {
            console.warn(error);
            const httpError = error as HttpError;
            const response: ErrorResponse = {
                message: httpError.message,
                errors: httpError.errors
            };
            res.status(httpError.statusCode).json(response);
        }
    );
};

const isClientError = (error: Error): boolean => {
    return error instanceof HttpError && error.statusCode < 500;
};

export default [handle404Error, handleError];
