import {Connection} from 'typeorm';
import {getConnection} from '../../db';
import User from "../../user/user-model";
import DonationRequest from "../../donation-request/dr-model";
import Place from "../../places/palce-model";
import Location from '../../models/location';
import {userDonationRequests} from "../../user/user-service";

describe('user service', () => {
    let db: Connection;

    async function clear() {
        await db.query('TRUNCATE TABLE "user" CASCADE;');
        await db.query('TRUNCATE TABLE "donation_request" CASCADE;');
    }

    beforeAll(async () => {
        db = await getConnection();
    });

    afterEach(clear);
    afterAll(clear);

    describe('userDonationRequests', () => {
        it('should get a users donation requests', async () => {
            const user = new User({
                name: 'test user',
                emailAddress: 'test@example.com',
                password: 'password',
                phoneNumber: '9988998898'
            });
            await user.save();

            const place = new Place({
                address: '',
                gmapsId: '',
                location: new Location({
                    latitude: 1,
                    longitude: 2,
                }),
                name: '',
                phoneNumber: '112233123'
            });
            await place.save();

            const donationRequest = new DonationRequest({
                attenderName: 'test',
                attenderPhoneNumber: '9988998898',
                notes: '',
                patientName: 'test patient',
                requester: Promise.resolve(user),
                requiredAsap: true,
                requiredBloodGroup: 'AB+',
                unitsRequired: 2,
                venue: place,
            });
            await donationRequest.save();

            const donationRequests = await userDonationRequests(user.id);
            expect(donationRequests!.length).toBe(1);
            expect(donationRequests![0].id).toBe(donationRequest.id);
        })
    });
});
