import { Entity, Column, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import BaseEntity from '../models/base-entity';
import Donor from '../donor/donor-model';
import DonationRequest from '../donation-request/donation-request-model';

@Entity()
export default class User extends BaseEntity {
    @Column()
    name!: string;

    @Column({ unique: true })
    emailAddress!: string;

    @Column({ unique: true })
    phoneNumber!: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password!: string;

    @OneToOne(type => Donor, donor => donor.user)
    donor!: Promise<Donor>;

    @OneToMany(
        type => DonationRequest,
        donationRequest => donationRequest.requester
    )
    donationRequests!: Promise<DonationRequest[]>;

    async isDonor(): Promise<boolean> {
        return (await this.donor) != null;
    }
}
