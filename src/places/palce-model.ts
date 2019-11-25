import BaseEntity from '../models/base-entity';
import {Entity, Column, OneToMany} from 'typeorm';
import Location from '../models/location';
import DonationRequest from '../donation-request/dr-model';

@Entity()
export default class Place extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column(type => Location, {prefix: ''})
    location!: Location;

    @Column()
    phoneNumber!: string;

    @Column({ unique: true })
    gmapsId!: string;

    @OneToMany(type => DonationRequest, dr => dr.venue)
    donationRequests!: Promise<DonationRequest[]>;
}
