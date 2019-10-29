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

    @Column()
    phoneNumber!: string;

    @Column({ type: 'time' })
    opensAt!: string;

    @Column({ type: 'time' })
    closesAt!: string;

    @Column()
    gmapsId!: string;

    @OneToMany(type => DonationRequest, dr => dr.hospital)
    requests!: Promise<DonationRequest[]>;
}
