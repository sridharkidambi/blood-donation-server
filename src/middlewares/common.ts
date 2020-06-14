import { Router, Request, Response, NextFunction, response } from 'express';
import {
    validationResult,
    ValidationChain,
} from 'express-validator';
import HttpError from '../errors/http-error';
import cors from 'cors';
import parser from 'body-parser';
import { ErrorCodes } from '../errors/error-codes';

export const handleCors = (router: Router) =>
    router.use(cors({ credentials: true, origin: true }));

export const parseRequestBody = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use((req, res, next) => {
        parser.json({
            // verify: (req, res, buf) => buf.toString(),
        })(req, res, (err) => {
            if (err) {
                const badRequestError = HttpError.badRequest('invalid_json', '');
                return next(badRequestError);
            }
            next();
        });
    });
};

export const logRequest = (router: Router) => {
    const log = (req: Request, res: Response) => {
        const oldWrite = res.write;
        const oldEnd = res.end;

        const chunks: any = [];
        (res as any).write = (...restArgs: any) => {
            chunks.push(Buffer.from(restArgs[0]));
            oldWrite.apply(res, restArgs);
        };

        res.end = (...restArgs: any) => {
            if (restArgs[0]) {
                chunks.push(Buffer.from(restArgs[0]));
            }
            let body = Buffer.concat(chunks).toString('utf8');
            console.log({
                time: new Date().toUTCString(),
                fromIP: req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress,
                method: req.method,
                originalUri: req.originalUrl,
                uri: req.url,
                requestData: req.body,
                responseData: body,
                referer: req.headers.referer || '',
                ua: req.headers['user-agent']
            });
            oldEnd.apply(res, restArgs);
        };
    }

    router.use((req: Request, res: Response, next: NextFunction) => {
        log(req, res);
        next();
    });

    router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        log(req, res);
        next(error);
    });
};

// Returns a middleware that will validate the given conditions
// and throw an error on any failure.
export const validate = (...validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        let errors = validationResult(req).formatWith(e => e.param);
        if (errors.isEmpty()) {
            return next();
        }

        const error = HttpError.unprocessableEntity(
            ErrorCodes.validationError,
            `Missing or invalid value(s) for ${errors.array().join(', ')}`
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
