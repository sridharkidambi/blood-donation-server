import { getConnection } from '../db';
import { Connection } from 'typeorm';
import User from '../entities/user';

describe('User entity', () => {
    let db: Connection;

    beforeEach(async done => {
        db = await getConnection();
        done();
    });

    afterEach(async done => {
        await User.clear();
        await db.close();
        done();
    });

    const getJohn = () => {
        const john = new User();
        john.firstName = 'John';
        john.lastName = 'Doe';
        john.emailAddress = 'john@test.com';
        john.password = 'password';
        return john;
    };

    it('should create a row in database table', async () => {
        const user = getJohn();
        await user.save();

        expect(user.id).toBeTruthy();
    });

    it('should hash password', async () => {
        const user = new User();
        const plainPassword = 'password';
        user.password = plainPassword;
        expect(user.password).not.toEqual(plainPassword);
    });
});
