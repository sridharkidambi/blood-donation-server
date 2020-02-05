import BaseEntity from './base-entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './user-model';
import BloodType from './blood-types';
import Gender from './gender';
import Location from './location';

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
