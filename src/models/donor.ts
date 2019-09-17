import BaseEntity from './base-entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './user';
import BloodType from './blood-types';

@Entity()
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
