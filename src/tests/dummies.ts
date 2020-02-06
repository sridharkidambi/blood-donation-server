import User from '../models/user';

export const dummyUser = () => {
    const john = new User();
    john.name = 'John Doe';
    john.emailAddress = 'john@test.com';
    john.phoneNumber = '9988776655';
    return john;
};
