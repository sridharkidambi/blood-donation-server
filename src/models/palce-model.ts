import BaseEntity from './base-entity';
import {Entity, Column, OneToMany} from 'typeorm';
import Location from './location';
import DonationRequest from './dr-model';

interface PlaceParams {
    name: string,
    address: string,
    location: Location,
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
        this.location = params.location;
        this.phoneNumber = params.phoneNumber;
        this.gmapsId = params.gmapsId;
    }

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column(type => Location, {prefix: ''})
    location!: Location;

    @Column()
    phoneNumber!: string;

    @Column({unique: true})
    gmapsId!: string;

    @OneToMany(type => DonationRequest, dr => dr.venue)
    donationRequests!: Promise<DonationRequest[]>;
}
