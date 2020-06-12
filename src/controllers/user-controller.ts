import { Request, Response, NextFunction } from 'express';
import { plainToClass, classToPlain } from 'class-transformer';
import User from '../models/user';
import HttpError from '../errors/http-error';
import * as service from '../service/user-service';
import { asyncMiddleware } from '../middlewares/common';
import { ErrorCodes, ErrorMessage } from '../errors/error-codes';

export const getUser = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.userId;
        const user = await service.findUserById(userId);
        if (!user) {
            return next(
                HttpError.notFound(ErrorCodes.notFound, 'No such user')
            );
        }
        res.status(200).json(classToPlain(user));
    }
);

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const params: User = plainToClass(User, (req.body as object));
    res.status(200);
    // TODO
};

export const login = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const { phoneNumber, password } = req.body;
        const responseData = await service.login(phoneNumber, password);

        if (!responseData) {
            throw HttpError.unauthorized(
                ErrorCodes.wrongCredentials,
                ErrorMessage.wrongCredentials
            );
        }

        res.status(200).json(responseData);
    }
);

export const registerUser = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = plainToClass(User, (req.body as object));
        try {
            const response = await service.createAndLoginUser(user);
            res.status(201).json(classToPlain(response)).send();
        } catch (e) {
            throw HttpError.internalServerError(ErrorCodes.failed, 'Something went wrong');
        }
    }
);