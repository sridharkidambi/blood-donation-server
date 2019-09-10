import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../errors/http-error';
import User from '../entities/user';
import TokenPayload from '../models/token-payload';
import config from '../config';

export const verify = (router: Router) => {
    router.use(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (typeof token !== 'string') {
            const error = new HttpError(401, 'Auth token token missing');
            return next(error);
        }
        try {
            const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
            const user = await User.find({ id: payload.userId });

            if (!user) throw new Error();

            return next();
        } catch (e) {
            const error = new HttpError(401, 'Invalid auth token');
            return next(error);
        }
    });
};

export const verifyToken = (token: string): Promise<TokenPayload> => {
    return new Promise(async (resolve, reject) => {
        if (typeof token !== 'string' || token.length <= 0) {
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
