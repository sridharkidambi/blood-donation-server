import { Entity, Column } from 'typeorm';
import BaseEntity from './base-entity';

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
}
