import {Column} from "typeorm";
import Coordinate from "./coordinate";

export default class Address {
    @Column({nullable: true})
    street?: string;

    @Column({nullable: true})
    area?: string;

    @Column({nullable: true})
    city?: string;

    @Column({nullable: true})
    pincode!: number;

    @Column({name: 'state', nullable: true})
    state?: string;

    @Column({name: 'country', nullable: true})
    country?: string;

    @Column({name: 'fallback_address', nullable: true})
    fallbackAddress?: string;

    @Column(type => Coordinate, {prefix: ''})
    coordinate!: Coordinate;
}
