import BaseEntity from '../models/base-entity';
import { Entity, Column, OneToMany } from 'typeorm';
import Location from '../common/orm/location';
import DonationRequest from '../donation-request/donation-request-model';

@Entity()
export default class Hospital extends BaseEntity {
    @Column()
    name!: string;

    @Column(type => Location, { prefix: '' })
    location!: Location;

    @Column({ name: 'phone_number' })
    phoneNumber!: string;

    @Column({ type: 'time', name: 'opens_at' })
    opensAt!: string;

    @Column({ type: 'time', name: 'closes_at' })
    closesAt!: string;

    @Column({ name: 'gmaps_id' })
    gmapsId!: string;

    @OneToMany(type => DonationRequest, dr => dr.hospital)
    requests!: Promise<DonationRequest[]>;
}
