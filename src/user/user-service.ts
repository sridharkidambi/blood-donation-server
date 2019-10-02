import User from './user-model';
import * as smsService from '../sms/sms-service';
import { classToPlain } from 'class-transformer';
import { generateToken } from '../auth';
import { encrypt, verifyHash } from './hash';

export const getUserByEmail = async (emailAddress: string) =>
    await User.findOne({ emailAddress });

export const getUserByPhoneNumber = async (phoneNumber: string) =>
    await User.findOne({ phoneNumber });

export const getUserById = async (id: number) => await User.findOne(id);

export const createAndLoginUser = async (user: User, otp: number) => {
    await createUser(user);
    const result = classToPlain(user);
    (result as any).token = generateToken({ userId: user.id });
    return result;
};

export const createUser = async (user: User) => {
    user.password = await encrypt(user.password);
    await user.save();
};

export const login = async (phoneNumber: string, password: string) => {
    const user = await getUserByPhoneNumber(phoneNumber);

    if (!user) return null;

    const passwordMatch = await verifyHash(password, user.password);
    if (!passwordMatch) return null;

    const userData = classToPlain(user);
    (userData as any).token = generateToken({ userId: user.id });

    return userData;
};

export const loginViaEmail = async (
    phoneNumber: string,
    password: string
) => {};

export const loginViaPhonuNumber = async (
    phoneNumber: string,
    password: string
) => {};

export const updateUser = async (params: User) => {
    // const user: User = await User.findOne({id: params})
};
