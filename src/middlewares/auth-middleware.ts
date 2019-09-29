import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../errors/http-error';
import TokenPayload from '../models/token-payload';
import config from '../config';

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

export const verifyToken = (token?: string): Promise<TokenPayload> => {
    return new Promise(async (resolve, reject) => {
        if (!token || typeof token !== 'string' || token.length <= 0) {
            return reject('Auth token token missing');
        }
        try {
            const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
            resolve(payload);
        } catch (e) {
            reject('Invalid auth token');
        }
    });
};

export const generateToken = (payload: TokenPayload) => {
    const options = { algorithm: 'HS256' };
    const token = jwt.sign(payload, config.jwtSecret, options);
    return token;
};
