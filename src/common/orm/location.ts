import { Column } from 'typeorm';

export default class Location {
    @Column({ name: 'latitude', type: 'float8' })
    latitude!: number;

    @Column({ name: 'longitude', type: 'float8' })
    longitude!: number;
}
