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

    @ManyToOne(type => Donation, donation => donation.donors)
    public donation!: Donation;

    @ManyToOne(type => Donor, donor => donor.donations)
    public donor!: Donor;
}
