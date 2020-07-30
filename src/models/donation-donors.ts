import {Column, Entity, JoinTable, ManyToOne} from "typeorm";
import BaseEntity from "./base-entity";
import Donation from "./donation";
import Donor from "./donor";

interface DonationDonorParams {
    donor: Donor;
    donorId: number;
    donation: Donation;
    donationId: number;
    status: DonationDonorStatus
}

export enum DonationDonorStatus {
    INITIAL = 'initial',
    UNAVAILALBLE = 'unavailable',
    AVAILABLE = 'available',
    DONATED = 'donated'
}

@Entity()
export default class DonationDonor extends BaseEntity {
    constructor(params: DonationDonorParams) {
        super();
        if (!params) return;
        this.donor = params.donor;
        this.donorId = params.donorId;
        this.donation = params.donation;
        this.donationId = params.donationId;
        this.status = params.status;
    }

    @Column()
    donationId!: number;

    @Column()
    donorId!: number;

    @Column({default: DonationDonorStatus.INITIAL})
    status!: DonationDonorStatus;

    @JoinTable()
    @ManyToOne(type => Donation, donation => donation.donationDonors)
    donation!: Donation;

    @JoinTable()
    @ManyToOne(type => Donor, donor => donor.donationDonors)
    donor!: Donor;
}
