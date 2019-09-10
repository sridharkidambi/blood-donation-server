import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import User from '../entities/user';
import HttpError from '../errors/http-error';
import * as userService from '../service/user';
import { asyncMiddleware } from '../middlewares/common';

export const getUser = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params['user_id'];
        const user = await userService.getUserById(userId);
        if (user === null) {
            return next(new HttpError(404, 'User not found'));
        }
        res.status(200).json(classToPlain(user));
    }
);

export const createUser = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const params: User = plainToClass(User, req.body);
        try {
            const user = await userService.createUser(params);
            res.status(201).json(classToPlain(user));
        } catch (e) {
            throw new HttpError(500, e.message);
        }
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
    const { email, password } = req.body;
    res.sendStatus(200);
    // TODO
};
