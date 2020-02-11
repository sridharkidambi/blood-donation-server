import BaseEntity from './base-entity';
import {Column, Entity, JoinColumn, OneToMany, OneToOne} from 'typeorm';
import User from './user';
import BloodType from './blood-group';
import Gender from './gender';
import Address from "./address";
import DonationDonor from "./donation-donors";

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

    @OneToMany(type => DonationDonor, donationDonor => donationDonor.donor)
    donations!: DonationDonor[];
}
