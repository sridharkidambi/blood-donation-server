import BaseEntity from './base-entity';
import {Entity, Column, OneToMany} from 'typeorm';
import Coordinate from './coordinate';
import Donation from './donation';
import Address from "./address";

interface PlaceParams {
    name: string,
    address?: Address,
    phoneNumber: string,
    gmapsId: string
}

@Entity()
export default class Place extends BaseEntity {
    constructor(params?: PlaceParams) {
        super();
        if (!params) return;
        this.name = params.name;
        this.address = params.address;
        this.phoneNumber = params.phoneNumber;
        this.gmapsId = params.gmapsId;
    }

    @Column()
    name!: string;

    @Column(type => Address, {prefix: 'address_'})
    address?: Address;

    @Column()
    phoneNumber!: string;

    @Column({unique: true})
    gmapsId!: string;
}