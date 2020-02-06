import User from '../models/user';
import {classToPlain} from 'class-transformer';
import {generateToken} from '../auth';
import {encrypt, verifyHash} from './hash';
import DonationRequest from "../models/donation-request";


export const findUserByEmail = async (emailAddress: string) => {
    return await User.findOne({emailAddress})
};

export const findUserByPhoneNumber = async (phoneNumber: string) => {
    return await User.findOne({phoneNumber});
};

export const findUserById = async (id: number) => {
    return await User.findOne(id);
};

export const createAndLoginUser = async (user: User) => {
    await createUser(user);
    const result = classToPlain(user);
    (result as any).token = generateToken({userId: user.id});
    return result;
};

export const createUser = async (user: User) => {
    user.password = await encrypt(user.password);
    await user.save();
};

export const updateUser = async (params: User) => {
    // const user: User = await User.findOne({id: params})
};

export const login = async (phoneNumber: string, password: string) => {
    const user = await findUserByPhoneNumber(phoneNumber);

    if (!user) return null;

    const passwordMatch = await verifyHash(password, user.password);
    if (!passwordMatch) return null;

    const userData = classToPlain(user);
    (userData as any).token = generateToken({userId: user.id});

    return userData;
};

export async function userDonationRequests(userId: number): Promise<DonationRequest[] | null> {
    const user = await User.findOne(userId);
    if (!user) return null;
    return await user.donationRequests;
};

export const loginViaEmail = async (
    phoneNumber: string,
    password: string
) => {
    //TODO
};

export const loginViaPhoneNumber = async (
    phoneNumber: string,
    password: string
) => {
    //TODO
};
