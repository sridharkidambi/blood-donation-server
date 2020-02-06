import BaseEntity from './base-entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import User from './user';
import BloodType from './blood-group';
import Gender from './gender';
import Coordinate from './coordinate';
import Address from "./address";

@Entity()
export default class Donor extends BaseEntity {
    @OneToOne(type => User, user => user.donor, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column(type => Address, {prefix: 'address_'})
    address!: Address;

    @Column()
    gender!: Gender;

    @Column()
    dob!: Date;

    @Column()
    bloodType!: BloodType;
}
