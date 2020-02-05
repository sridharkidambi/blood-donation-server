import bcrypt from 'bcrypt';

export const encrypt = async (val: string) => {
    return bcrypt.hashSync(val, 10);
};

export const verifyHash = async (val: string, hash: string) => {
    return bcrypt.compareSync(val, hash);
};
