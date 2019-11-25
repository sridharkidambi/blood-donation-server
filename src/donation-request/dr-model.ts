import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import BaseEntity from '../models/base-entity';
import User from '../user/user-model';
import Place from '../places/palce-model';

@Entity()
export default class DonationRequest extends BaseEntity {
    @ManyToOne(type => User, user => user.donationRequests, {nullable: false})
    @JoinColumn()
    requester!: Promise<User>;

    @ManyToOne(type => Place, place => place.donationRequests, {
        nullable: false,
        eager: true,
    })
    @JoinColumn()
    venue!: Place;

    @Column()
    patientName!: string;

    @Column()
    requiredBloodGroup!: string;

    @Column()
    unitsRequired!: number;

    @Column({type: 'timestamp', nullable: true})
    requiredOn!: Date;

    @Column()
    requiredAsap!: boolean;

    @Column()
    attenderName!: string;

    @Column()
    attenderPhoneNumber!: string;

    @Column({type: 'text', nullable: true})
    notes!: string;
}
