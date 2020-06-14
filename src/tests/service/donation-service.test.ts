import { Connection } from 'typeorm';
import { getConnection } from '../../db';
import { createDonation } from "../../service/donation-service";
import { plainToClass } from "class-transformer";
import User from "../../models/user";
import Donation from '../../models/donation';
import BloodGroup from '../../models/blood-group';

describe('donation request service', () => {
    let db: Connection;

    async function clear() {
        await db.query('TRUNCATE TABLE "user" CASCADE;');
        await db.query('TRUNCATE TABLE "place" CASCADE;');
        await db.query('TRUNCATE TABLE "donation_request" CASCADE;');
    }

    beforeAll(async () => {
        db = await getConnection();
        await clear()
    });

    afterEach(clear);

    afterAll(async () => {
        await db.close();
    });

    describe('createDonation', () => {
        it('should create a donation request successfully', async done => {
            const user = plainToClass(User, {
                name: 'Test User',
                emailAddress: 'email@example.com',
                phoneNumber: '9988998800',
                password: 'password',
            });
            await user.save();

            const params = {
                attenderName: "Test Attender",
                attenderPhoneNumber: "9988776655",
                patientName: "Test Patient",
                requesterId: user.id,
                requiredAsap: true,
                requiredBloodGroup: BloodGroup.AB_POSITIVE,
                requiredOn: undefined,
                unitsRequired: 1,
                venue: {
                    gmapsId: "ChIJE21tB2RdUjoRVStsX3KYeeU" // gem hospital, chennai
                }
            };

            const request = await createDonation(params as Donation);

            expect(request.id).toBeTruthy();

            const requester = await request.requester;
            expect(requester.id).toEqual(user.id);

            expect(request.venue.id).toBeTruthy();

            done();
        });
    });
});
