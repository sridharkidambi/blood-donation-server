import User from '../user/user-model';

export const dummyUser = () => {
    const john = new User();
    john.firstName = 'John';
    john.lastName = 'Doe';
    john.emailAddress = 'john@test.com';
    john.phoneNumber = '9988776655';
    return john;
};
