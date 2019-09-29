import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import User from './user-model';
import HttpError from '../errors/http-error';
import * as service from './user-service';
import { asyncMiddleware } from '../middlewares/common';

export const getUser = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params['user_id'];
        const user = await service.getUserById(userId);
        if (!user) {
            return next(new HttpError(404, 'User not found'));
        }
        res.status(200).json(classToPlain(user));
    }
);

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const params: User = plainToClass(User, req.body);
    console.log(params);
    res.status(200);
    // TODO
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { phoneNumber, otp } = req.body;

    res.sendStatus(200);
};

export const registerUser = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = plainToClass(User, req.body);
        const otp = req.body.otp;
        try {
            const response = await service.verifyAndCreateUser(user, otp);
            res.status(201)
                .json(classToPlain(response))
                .send();
        } catch (e) {
            throw new HttpError(422, 'Failed to register user', [e]);
        }
    }
);
