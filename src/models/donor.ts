import BaseEntity from './base-entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import User from './user';
import BloodGroup from './blood-group';
import Gender from './gender';
import Address from "./address";
import DonationDonor from "./donation-donors";

interface DonorParams {
    userId: number;
    address: Address;
    gender: Gender;
    dob: Date;
    bloodGroup: BloodGroup;
    lastDonatedOn: Date | undefined;
}

@Entity()
export default class Donor extends BaseEntity {
    constructor(params: DonorParams) {
        super();
        if (!params) return;
        this.userId = params.userId;
        this.address = params.address;
        this.gender = params.gender;
        this.dob = params.dob;
        this.bloodGroup = params.bloodGroup;
        this.lastDonatedOn = params.lastDonatedOn;
    }

    @OneToOne(type => User, user => user.donor, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    userId!: number;

    @Column(type => Address, { prefix: 'address_' })
    address!: Address;

    @Column()
    gender!: Gender;

    @Column()
    dob!: Date;

    @Column()
    bloodGroup!: BloodGroup;

    @Column({ nullable: true })
    lastDonatedOn?: Date;

    @OneToMany(type => DonationDonor, donationDonor => donationDonor.donor)
    donations!: DonationDonor[];
}
