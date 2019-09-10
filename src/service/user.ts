import User from '../entities/user';

export const getUserByEmail = async (
    emailAddress: string
): Promise<User | null> => {
    const user = await User.findOne({ emailAddress });
    if (!user) return null;
    return user;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const user = await User.findOne({ id });
    if (!user) return null;
    return user;
};

export const createUser = async (user: User) => {
    await user.save();
    return user;
};

export const updateUser = async (params: User) => {
    // const user: User = await User.findOne({id: params})
};
