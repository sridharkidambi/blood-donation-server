import request from 'supertest';
import { Connection } from 'typeorm';
import router from '../../router';
import { getConnection } from '../../db';
import User from '../../models/user';
import Donor from '../../models/donor';
import { dummyUser } from '../dummies';

describe('donor endpoint', () => {
    let db: Connection;

    beforeAll(async () => {
        db = await getConnection();
    });

    afterEach(async () => {
        await db.query('TRUNCATE TABLE "user" CASCADE;');
    });

    afterAll(async () => {
        await db.query('TRUNCATE TABLE "user" CASCADE;');
        await db.close();
    });

    describe('POST /donor', () => {
        it('should respond 422 for no params', async done => {
            const response = await request(router).post('/api/v1/donor');
            expect(response.status).toBe(422);
            done();
        });

        it('should create a donor profile', async done => {
            const user = dummyUser();
            await user.save();

            const donorParams = {
                userId: user.id,
                locality: 'Madipakkam',
                city: 'Chennai',
                state: 'Tamil Nadu',
                pincode: 600061,
                gender: 'male',
                dob: '1995-10-01',
                bloodType: 'AB+',
                latitude: 12.971534,
                longitude: 80.190017
            };
            const response = await request(router)
                .post('/api/v1/donor')
                .send(donorParams);

            const donor = await user.donor;

            expect(response.status).toBe(201);
            expect(donor.id).not.toBeFalsy();

            done();
        });
    });
});
