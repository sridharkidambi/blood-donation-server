import faker from 'faker';
import moment from 'moment';
import User from './models/user';
import {getConnection} from './db';
import {encrypt} from './service/hash';
import Donor from './models/donor';
import Gender from './models/gender';
import BloodGroup from './models/blood-group';
import Coordinate from './models/coordinate';
import {getValues} from './common/utils';
import Donation from './models/donation';
import Place from './models/place';

faker.locale = "en_IND";

function fakePlace(): Place {
    return new Place({
        address: [
            faker.address.streetAddress(),
            faker.address.city(),
            faker.address.zipCode(),
            faker.address.state(),
            "India"
        ].join(", "),
        gmapsId: faker.random.uuid(),
        coordinate: new Coordinate({
            latitude: parseFloat(faker.address.latitude()),
            longitude: parseFloat(faker.address.longitude())
        })
    });
}

(async function () {
    const db = await getConnection();
    const genders = getValues(Gender);
    const bloodGroups = getValues(BloodGroup);

    const random = (list: any) => list[Math.floor(Math.random() * list.length)];

    const randGender = () => random(genders);
    const randBloodGroup = () => random(bloodGroups);

    // users
    async function seedUsers() {
        const users: User[] = [];
        const password = await encrypt('password');

        for (let i = 0; i < 100; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            let user = new User({
                name: firstName + ' ' + lastName,
                emailAddress: (firstName + lastName + '@example.com').toLowerCase(),
                phoneNumber: `99999999${i <= 9 ? '0' : ''}${i}`,
                password: password,phone_verified: false
            });
            users.push(user);
        }
        await User.getRepository().save(users);
        return users;
    }

    async function seedDonors(users: User[]) {
        const donors: Donor[] = [];

        users.forEach(user => {
            const donor = new Donor({
                userId: user.id,
                residence: fakePlace(),
                gender: randGender(),
                bloodGroup: randBloodGroup(),
                dob: faker.date.past(25),
                lastDonatedOn: user.id % 3 == 0 ? faker.date.between(
                    moment().subtract(12, 'months').toDate(),
                    moment().subtract(1, 'month').toDate(),
                ) : undefined,
                available: true,
            });
            donors.push(donor);
        });
        await Donor.getRepository().save(donors);
        return donors;
    }

    // async function seedPlaces() {
    //     const places: Place[] = [];
    //     for (let i = 0; i < 30; i++) {
    //         const place = new Place({
    //             name: faker.company.companyName() + ' Hospital',
    //             address: new Address({
    //                 street: faker.address.streetName(),
    //                 landmark: undefined,
    //                 area: 'sample',
    //                 city: faker.address.city(),
    //                 pincode: faker.address.zipCode(),
    //                 state: faker.address.state(),
    //                 country: 'india',
    //                 coordinate: new Coordinate({
    //                     latitude: parseFloat(faker.address.latitude()),
    //                     longitude: parseFloat(faker.address.longitude())
    //                 })
    //             }),
    //             phoneNumber: faker.phone.phoneNumber(),
    //             gmapsId: faker.random.uuid()
    //         });
    //         places.push(place);
    //     }
    //     await Place.getRepository().save(places);
    //     return places;
    // }

    async function seedDonations(users: User[]) {
        const donations: Donation[] = [];
        for (let bloodGroup of bloodGroups) {
            const requester = random(users);
            const donation = new Donation({
                patientName: faker.name.firstName() + ' ' + faker.name.lastName(),
                attenderName: faker.name.firstName() + ' ' + faker.name.lastName(),
                attenderPhoneNumber: faker.phone.phoneNumber(),
                requester,
                requiredAsap: requester.id % 2 == 0,
                requiredBloodGroup: bloodGroup,
                venue: fakePlace(),
                unitsRequired: faker.random.number({min: 1, max: 5}),
                requiredOn: (requester.id % 2 != 0) ? faker.date.between(
                    moment().toDate(),
                    moment().add(10, 'days').toDate(),
                ) : undefined,
                notes: faker.random.number() % 3 == 0 ? faker.lorem.sentence() : undefined,
            });
            donations.push(donation);
        }
        await Donation.getRepository().save(donations);
        return donations;
    }


    // start
    // const places = await seedPlaces();
    const users = await seedUsers();
    const donors = await seedDonors(users);
    const donations = await seedDonations(users);
})();