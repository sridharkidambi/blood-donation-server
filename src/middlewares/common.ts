import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import config from '../config';
import HttpError from '../errors/http-error';
import cors from 'cors';
import parser from 'body-parser';
import morgan from 'morgan';

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

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const message = 'Required fields are missing or invalid.';
        const error = new HttpError(422, message, errors.array());
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
