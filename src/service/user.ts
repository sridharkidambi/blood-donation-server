import User from '../models/user';
import * as smsService from './sms';

export const getUserByEmail = async (emailAddress: string) =>
    await User.findOne({ emailAddress });

export const getUserByPhoneNumber = async (phoneNumber: string) =>
    await User.findOne({ phoneNumber });

export const getUserById = async (id: number) => await User.findOne(id);

export const createUser = async (user: User, otp: number) => {
    const otpResult = await smsService.verifyOtp(user.phoneNumber, otp);
    if (otpResult == smsService.OtpVerificationResult.verified) {
        return await user.save();
    }
    return Promise.reject(otpResult);
};

export const updateUser = async (params: User) => {
    // const user: User = await User.findOne({id: params})
};
