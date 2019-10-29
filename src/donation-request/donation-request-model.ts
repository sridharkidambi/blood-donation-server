import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from '../models/base-entity';
import User from '../user/user-model';
import Hospital from '../hopital/hospital-model';

@Entity()
export default class DonationRequest extends BaseEntity {
    @ManyToOne(type => User, user => user.donationRequests, {nullable: false})
    @JoinColumn()
    requester!: Promise<User>;

    @ManyToOne(type => Hospital, hospital => hospital.requests, {
        nullable: false
    })
    @JoinColumn()
    hospital!: Hospital;

    @Column()
    patientName!: string;

    @Column()
    patientGender!: string;

    @Column()
    patientBloodGroup!: string;

    @Column()
    unitsRequired!: number;

    @Column({type: 'timestamp'})
    requiredOn!: Date;

    @Column()
    requiredImmediately!: boolean;

    @Column()
    relationship!: string;

    @Column({type: 'text'})
    description!: string;
}
