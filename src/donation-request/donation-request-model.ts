import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntity from '../models/base-entity';
import User from '../user/user-model';
import Hospital from '../hopital/hospital-model';

@Entity()
export default class DonationRequest extends BaseEntity {
    @ManyToOne(type => User, user => user.donationRequests, { nullable: false })
    @JoinColumn({ name: 'requester_id' })
    requester!: Promise<User>;

    @ManyToOne(type => Hospital, hosital => hosital.requests, {
        nullable: false
    })
    @JoinColumn({ name: 'hospital_id' })
    hospital!: Hospital;

    @Column({ name: 'patient_name' })
    patientName!: string;

    @Column({ name: 'patient_gender' })
    patientGender!: string;

    @Column({ name: 'patient_blood_group' })
    patientBloodGroup!: string;

    @Column({ name: 'units_required' })
    unitsRequired!: number;

    @Column({ name: 'required_on', type: 'timestamp' })
    requiredOn!: Date;

    @Column()
    realationship!: string;

    @Column({ type: 'text' })
    notes!: string;
}
