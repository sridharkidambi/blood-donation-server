import BaseEntity from '../models/base-entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from '../user/user-model';
import BloodType from '../models/blood-types';
import Gender from '../models/gender';
import Location from '../common/orm/location';

@Entity()
export default class Donor extends BaseEntity {
    @OneToOne(type => User, user => user.donor, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ nullable: true })
    address!: string;

    @Column()
    locality!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    pincode!: number;

    @Column()
    gender!: Gender;

    @Column()
    dob!: Date;

    @Column()
    bloodType!: BloodType;

    @Column(type => Location, { prefix: '' })
    location!: Location;
}
