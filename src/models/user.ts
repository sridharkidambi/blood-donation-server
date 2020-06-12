import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import BaseEntity from './base-entity';
import Donor from './donor';
import Donation from './donation';

interface UserParams {
    name: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
}

@Entity()
export default class User extends BaseEntity {
    constructor(params?: UserParams) {
        super();
        if (!params) return;
        this.name = params.name;
        this.emailAddress = params.emailAddress;
        this.phoneNumber = params.phoneNumber;
        this.password = params.password;
    }

    @Column()
    name!: string;

    @Column({ unique: true })
    emailAddress!: string;

    @Column({ unique: true })
    phoneNumber!: string;

    @Column({ nullable: true })
    @Exclude({ toPlainOnly: true })
    password!: string;

    @OneToOne(type => Donor, donor => donor.user, { eager: true })
    donor!: Promise<Donor>;

    @OneToMany(type => Donation, donation => donation.requester)
    requests!: Promise<Donation[]>;

    async isDonor(): Promise<boolean> {
        return !!(await this.donor);
    }
}
