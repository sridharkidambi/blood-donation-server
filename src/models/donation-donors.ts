import {Column, Entity, ManyToOne} from "typeorm";

import BaseEntity from "./base-entity";
import Donation from "./donation";
import Donor from "./donor";

@Entity()
export default class DonationDonor extends BaseEntity {
    @Column()
    donationId!: number;

    @Column()
    donorId!: number;

    @Column()
    status!: DonorStatus;

    @Column()
    availableAt!: Date;

    @ManyToOne(type => Donation, donation => donation.donors)
    donation!: Donation;

    @ManyToOne(type => Donor, donor => donor.donations)
    donor!: Donor;
}

export enum DonorStatus {
    REQUESTED = 'requested',
    DECLINED = 'declined',
    ACCEPTED = 'accepted',
    DONATED = 'donated',
    CANCELLED = 'cancelled'
}
