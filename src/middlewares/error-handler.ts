import { Request, Response, NextFunction, Router } from 'express';
import ErrorResponse from '../models/error-response';
import HttpError from '../errors/http-error';
import config from '../config';
import { ErrorCodes, ErrorMessage } from '../errors/error-codes';

// this is the last middleware and hence is the right place to handle
// 404 error
const handle404Error = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        throw HttpError.notFound(
            ErrorCodes.methodNotFound,
            ErrorMessage.methodNotFound
        );
    });
};

const handleError = (router: Router) => {
    router.use(
        (error: Error, req: Request, res: Response, next: NextFunction) => {
            console.warn(error);
            if (error instanceof HttpError) {
                const response: ErrorResponse = {
                    message: error.message,
                    code: error.errorCode
                };
                return res.status(error.statusCode).json(response);
            }
            res.status(500).send();
        }
    );
};

export default [handle404Error, handleError];
