import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad
} from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from '../models/base-entity';
import Donor from '../donor/donor';

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

    @Column()
    password!: string;

    @OneToOne(type => Donor, donor => donor.user)
    donor!: Promise<Donor>;
}
