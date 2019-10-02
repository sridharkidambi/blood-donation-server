import jwt from 'jsonwebtoken';
import TokenPayload from '../models/token-payload';
import config from '../config';

export const generateToken = (payload: TokenPayload) => {
    const options = { algorithm: 'HS256' };
    const token = jwt.sign(payload, config.jwtSecret, options);
    return token;
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
