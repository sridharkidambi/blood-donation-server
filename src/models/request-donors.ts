import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import BaseEntity from "./base-entity";
import Donation from "./donation";
import Donor from "./donor";

@Entity()
export default class DonationDonor extends BaseEntity {
    @Column()
    donationId!: number;

    @Column()
    donorId!: number;
}
