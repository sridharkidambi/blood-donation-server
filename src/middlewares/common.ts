import { Router, Request, Response, NextFunction } from 'express';
import {
    validationResult,
    ValidationChain,
    ValidationError
} from 'express-validator';
import config from '../config';
import HttpError from '../errors/http-error';
import cors from 'cors';
import parser from 'body-parser';
import morgan from 'morgan';
import { ErrorCodes } from '../errors/error-codes';

export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

export const parseRequestBody = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

export const logRequest = (router: Router) => {
    const format = config.isProduction ? 'tiny' : 'dev';
    router.use(morgan(format));
};

// Returns a middleware that will validate the given conditions
// and throw an error on any failure.
export const validate = (...validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        let errors = validationResult(req).formatWith(
            e => `${e.param}: ${e.msg}`
        );
        if (errors.isEmpty()) {
            return next();
        }

        const error = HttpError.unprocessableEntity(
            ErrorCodes.validationError,
            errors.array().join(',\n')
        );
        next(error);
    };
};

export const asyncMiddleware = (fn: Function) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const slowDown = (delayInMs: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        setTimeout(() => next(), delayInMs);
    };
};
