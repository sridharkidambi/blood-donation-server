import BaseEntity from './base-entity';
import {Entity, Column, OneToMany} from 'typeorm';
import Coordinate from './coordinate';
import DonationRequest from './donation-request';

interface PlaceParams {
    name: string,
    address: string,
    coordinate: Coordinate,
    phoneNumber: string,
    gmapsId: string
}

@Entity()
export default class Place extends BaseEntity {
    constructor(params?: PlaceParams) {
        super();
        if (!params) return;
        this.name = params.name;
        this.address = params.address;
        this.coordinate = params.coordinate;
        this.phoneNumber = params.phoneNumber;
        this.gmapsId = params.gmapsId;
    }

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column(type => Coordinate, {prefix: ''})
    coordinate!: Coordinate;

    @Column()
    phoneNumber!: string;

    @Column({unique: true})
    gmapsId!: string;

    @OneToMany(type => DonationRequest, dr => dr.venue)
    donationRequests!: Promise<DonationRequest[]>;
}
