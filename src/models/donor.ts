import BaseEntity from './base-entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './user';
import BloodType from './blood-types';
import Gender from './gender';

@Entity()
export default class Donor extends BaseEntity {
    @OneToOne(type => User, user => user.donor, {
        eager: true,
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

    @Column({ name: 'blood_type' })
    bloodType!: BloodType;

    @Column({ type: 'float8' })
    latitude!: number;

    @Column({ type: 'float8' })
    longitude!: number;
}
