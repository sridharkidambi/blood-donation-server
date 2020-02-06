import {Connection} from 'typeorm';
import {getConnection} from '../../db';
import User from "../../models/user";
import DonationRequest from "../../models/donation-request";
import Place from "../../models/place";
import Coordinate from '../../models/coordinate';
import {userDonationRequests} from "../../service/user-service";

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
                name: '',
                gmapsId: '',
                phoneNumber: '112233123',
                address: {
                    coordinate: {
                        latitude: 1,
                        longitude: 2,
                    }
                },
            });
            await place.save();

            const donationRequest = new DonationRequest({
                attenderName: 'test',
                attenderPhoneNumber: '9988998898',
                notes: '',
                patientName: 'test patient',
                requester: user,
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
