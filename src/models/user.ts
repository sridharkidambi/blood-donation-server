import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import BaseEntity from './base-entity';
import Donor from './donor';

@Entity()
export default class User extends BaseEntity {
    @Column({ name: 'first_name' })
    firstName!: string;

    @Column({ name: 'last_name', nullable: true })
    lastName!: string;

    @Column({ name: 'email_address', unique: true })
    emailAddress!: string;

    @Column({ name: 'phone_number', unique: true })
    phoneNumber!: string;

    @OneToOne(type => Donor, donor => donor.user)
    donor!: Promise<Donor>;
}
