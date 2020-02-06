import {Column} from 'typeorm';

interface CoordinateParams {
    latitude: number;
    longitude: number;
}

export default class Coordinate {
    constructor(params?: CoordinateParams) {
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
