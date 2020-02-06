import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import BaseEntity from './base-entity';
import User from './user';
import Place from './place';

interface DonationRequestParams {
    requester: User,
    venue: Place,
    patientName: string,
    requiredBloodGroup: string,
    unitsRequired: number,
    requiredOn?: Date,
    requiredAsap: boolean,
    attenderName: string,
    attenderPhoneNumber: string,
    notes: string,
}

@Entity()
export default class DonationRequest extends BaseEntity {
    constructor(params?: DonationRequestParams) {
        super();
        if (!params) return;
        this.requester = Promise.resolve(params.requester);
        this.venue = params.venue;
        this.patientName = params.patientName;
        this.requiredBloodGroup = params.requiredBloodGroup;
        this.unitsRequired = params.unitsRequired;
        this.requiredOn = params.requiredOn;
        this.requiredAsap = params.requiredAsap;
        this.attenderName = params.attenderName;
        this.attenderPhoneNumber = params.attenderPhoneNumber;
        this.notes = params.notes;
    }

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
    requiredOn?: Date;

    @Column()
    requiredAsap!: boolean;

    @Column()
    attenderName!: string;

    @Column()
    attenderPhoneNumber!: string;

    @Column({type: 'text', nullable: true})
    notes!: string;
}
