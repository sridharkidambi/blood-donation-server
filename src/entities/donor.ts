import BaseEntity from './base-entity';
import { OneToOne, Column } from 'typeorm';
import User from './user';
import BloodType from '../utils/blood-types';

export default class Donor extends BaseEntity {
    @OneToOne(type => User, user => user.donor)
    user!: User;

    @Column({ nullable: false })
    address!: string;

    @Column()
    locality!: string;

    @Column()
    state!: string;

    @Column()
    pincode!: number;

    @Column({ length: 16 })
    gender!: string;

    @Column()
    dob!: Date;

    @Column({ name: 'blood_type' })
    bloodType!: BloodType;

    @Column({ type: 'float8' })
    longitude!: number;

    @Column({ type: 'float8' })
    latitude!: number;
}
