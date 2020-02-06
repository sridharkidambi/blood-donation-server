import {Connection} from "typeorm";
import {getConnection} from "../../db";
import {findOrCreatePlace} from "../../service/place-service";
import Place from "../../models/place";

describe('place service', () => {
    let db: Connection;

    beforeAll(async () => {
        db = await getConnection();
        await db.query('truncate table place cascade;');
    });

    afterEach(async () => {
        await db.query('truncate table place cascade;');
    });

    afterAll(async () => {
        await db.close();
    });

    describe('findOrCreatePlace', () => {
        it('should create a new entry', async done => {
            const eiffelTower = "ChIJLU7jZClu5kcR4PcOOO6p3I0";

            let places = await Place.find();
            expect(places.length).toBe(0);

            const place = await findOrCreatePlace(eiffelTower);

            places = await Place.find();
            expect(place.id).toBeTruthy();
            expect(places.length).toBe(1);

            done();
        });

        it('should return the existing entry', async done => {
            const eiffelTower = "ChIJLU7jZClu5kcR4PcOOO6p3I0";

            const place = new Place({
                name: "name",
                phoneNumber: "9988998899",
                gmapsId: eiffelTower,
                address: {
                    coordinate: {latitude: 1, longitude: 1}
                }
            });
            await place.save();

            expect(await Place.count()).toBe(1);

            const searchResult = await findOrCreatePlace(eiffelTower);
            expect(searchResult.id).toBe(place.id);

            expect(await Place.count()).toBe(1);

            done();
        });
    });
});
