import {Request} from 'express';
import {findUserById} from '../user/user-service';

export const currentUser = async (req: Request) => {
    const userId = currentUserId(req);
    if (!userId) return null;

    return await findUserById(userId);
};

export const currentUserId = (req: Request) => (req as any).payload.userId;
