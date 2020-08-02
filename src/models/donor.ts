import BaseEntity from './base-entity';
import {BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne} from 'typeorm';
import User from './user';
import BloodGroup from './blood-group';
import Gender from './gender';
import DonationDonor from "./donation-donors";
import Place from "./place";

interface DonorParams {
    userId: number;
    gender: Gender;
    residence: Place;
    dob: Date;
    bloodGroup: BloodGroup;
    available: boolean;
    lastDonatedOn?: Date;
}

@Entity()
export default class Donor extends BaseEntity {
    constructor(params: DonorParams) {
        super();
        if (!params) return;
        this.userId = params.userId;
        this.residence = params.residence;
        this.gender = params.gender;
        this.dob = params.dob;
        this.available = params.available;
        this.bloodGroup = params.bloodGroup;
        this.lastDonatedOn = params.lastDonatedOn;
    }

    @OneToOne(type => User, user => user.donor, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'user_id'})
    user!: User;

    @Column()
    userId!: number;

    @Column(type => Place, {prefix: 'residence_'})
    residence!: Place;

    @Column()
    gender!: Gender;

    @Column()
    dob!: Date;

    @Column()
    bloodGroup!: BloodGroup;

    @Column({nullable: true})
    lastDonatedOn?: Date;

    @Column({nullable: true, default: () => "true"})
    available!: boolean;

    @OneToMany(type => DonationDonor, donationDonor => donationDonor.donor)
    donationDonors!: DonationDonor[];

    @BeforeInsert()
    beforeInsert() {
        this.available = true;
    }
}
