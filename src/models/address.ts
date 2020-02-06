import {Column} from "typeorm";
import Coordinate from "./coordinate";

export default class Address {
    @Column({name: 'street_address'})
    streetAddress?: string;

    @Column({name: 'area'})
    area?: string;

    @Column({name: 'city'})
    city?: string;

    @Column({name: 'state'})
    state?: string;

    @Column({name: 'country'})
    country?: string;

    @Column({name: 'fallback_address'})
    fallbackAddress?: string;

    @Column(type => Location, {prefix: ''})
    coordinate!: Coordinate;
}
