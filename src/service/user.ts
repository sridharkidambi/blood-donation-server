import User from '../models/user';

export const getUserByEmail = async (emailAddress: string) =>
    await User.findOne({ emailAddress });

export const getUserByPhoneNumber = async (phoneNumber: string) =>
    await User.findOne({ phoneNumber });

export const getUserById = async (id: number) => await User.findOne(id);

export const createUser = async (user: User) => await user.save();

export const updateUser = async (params: User) => {
    // const user: User = await User.findOne({id: params})
};
