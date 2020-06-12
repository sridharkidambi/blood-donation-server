import { Column } from "typeorm";
import Coordinate from "./coordinate";

export interface AddressParam {
    street?: string,
    landmark?: string,
    area?: string,
    city?: string,
    pincode: number,
    state?: string,
    country?: string,
    coordinate?: Coordinate,
}

export default class Address {
    constructor(params?: AddressParam) {
        if (!params) return;
        this.street = params.street;
        this.landmark = params.landmark;
        this.area = params.area;
        this.city = params.city;
        this.pincode = params.pincode;
        this.state = params.state;
        this.country = params.country;
        this.coordinate = params.coordinate;
    }

    @Column({ nullable: true })
    street?: string;

    @Column({ nullable: true })
    landmark?: string;

    @Column({ nullable: true })
    area?: string;

    @Column({ nullable: true })
    city?: string;

    @Column({ nullable: true })
    pincode?: number;

    @Column({ name: 'state', nullable: true })
    state?: string;

    @Column({ name: 'country', nullable: true })
    country?: string;

    @Column(type => Coordinate, { prefix: '' })
    coordinate?: Coordinate;
}
