import { getConnection } from '../../db';
import { Connection } from 'typeorm';
import User from '../../models/user';
import { dummyUser } from '../dummies';

describe('User entity', () => {
    let db: Connection;

    beforeAll(async () => {
        db = await getConnection();
    });

    afterEach(async () => {
        await db.query('TRUNCATE TABLE "user" CASCADE;');
    });

    afterAll(async () => {
        await db.close();
    });

    it('should create a row in database table', async done => {
        const user = dummyUser();
        await user.save();

        expect(user.id).toBeTruthy();

        done();
    });
});
