import {Request} from 'express';
import User from "../user/user-model";

export const currentUser = async (req: Request) => {
    const userId = (req as any).payload.userId;
    if (!userId) return null;

    return await User.findOne(userId);
}
