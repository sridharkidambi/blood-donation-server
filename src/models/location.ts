import {Column} from 'typeorm';

interface LocationParams {
    latitude: number;
    longitude: number;
}

export default class Location {
    constructor(params?: LocationParams) {
        if (params) {
            this.longitude = params.longitude;
            this.latitude = params.latitude;
        }
    }

    @Column({name: 'latitude', type: 'float8'})
    latitude?: number;

    @Column({name: 'longitude', type: 'float8'})
    longitude?: number;
}
