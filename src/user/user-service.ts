import User from './user-model';
import * as smsService from '../sms/sms-service';
import { classToPlain } from 'class-transformer';
import { generateToken } from '../auth';

export const getUserByEmail = async (emailAddress: string) =>
    await User.findOne({ emailAddress });

export const getUserByPhoneNumber = async (phoneNumber: string) =>
    await User.findOne({ phoneNumber });

export const getUserById = async (id: number) => await User.findOne(id);

export const createAndLoginUser = async (user: User, otp: number) => {
    const otpResult = await smsService.verifyOtp(user.phoneNumber, otp);
    if (otpResult !== smsService.OtpVerificationResult.verified) {
        return Promise.reject(otpResult);
    }

    await createUser(user);
    const result = classToPlain(user);
    (result as any).token = generateToken({ userId: user.id });
    return result;
};

export const createUser = async (user: User) => await user.save();

export const loginUser = async (phoneNumber: string) => {};

export const updateUser = async (params: User) => {
    // const user: User = await User.findOne({id: params})
};
