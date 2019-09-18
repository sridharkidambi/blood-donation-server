import { getConnection } from '../../db';
import { Connection } from 'typeorm';
import User from '../../models/user';
import { dummyUser } from '../dummies';

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

    it('should create a row in database table', async () => {
        const user = dummyUser();
        await user.save();

        expect(user.id).toBeTruthy();
    });
});
