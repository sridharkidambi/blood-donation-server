import request from 'supertest';
import { Connection } from 'typeorm';
import router from '../../router';
import { getConnection } from '../../db';
import User from '../../models/user';

describe('user endpoint', () => {
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

    describe('POST /login', () => {
        it('should respond 422 for missing credentials', async done => {
            const response = await request(router).post('/api/v1/login');
            expect(response.status).toEqual(422);
            done();
        });

        it('should response 422 for incorrect email address', async done => {
            const response = await request(router)
                .post('/api/v1/login')
                .send({
                    email: 'invalid email@test.com',
                    password: 'password'
                });
            expect(response.status).toEqual(422);
            done();
        });
    });

    describe('POST /user', () => {
        it('should respond 422 for invalid body', async () => {
            const response = await request(router).post('/api/v1/register');
            expect(response.status).toEqual(422);
        });

        it('should respond 201 and return the user', async () => {
            const response = await request(router)
                .post('/api/v1/register')
                .send({
                    emailAddress: 'john@example.com',
                    phoneNumber: '9988776655',
                    firstName: 'John'
                });
            expect(response.status).toEqual(201);
            expect(response.body.id).not.toBeFalsy();
        });

        it('should respond 422 for duplicate registration', async () => {
            const firstResponse = await request(router)
                .post('/api/v1/register')
                .send({
                    emailAddress: 'john2@example.com',
                    phoneNumber: '9988776655',
                    firstName: 'John'
                });
            expect(firstResponse.status).toEqual(201);

            const secondResponse = await request(router)
                .post('/api/v1/register')
                .send({
                    emailAddress: 'john@example.com',
                    password: 'password',
                    firstName: 'John'
                });
            expect(secondResponse.status).toEqual(422);
        });
    });

    describe('GET /user', () => {
        it('should get the user with the given id', async () => {
            const user = new User();
            user.id = 1;
            user.emailAddress = 'test@email.com';
            user.phoneNumber = '9988776655';
            user.name = 'John';

            await user.save();

            const response = await request(router).get(
                `/api/v1/user/${user.id}`
            );
            expect(response.body.emailAddress).toBe(user.emailAddress);
            expect(response.body.password).toBeFalsy();
        });
    });
});
