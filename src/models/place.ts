import {Column, Entity} from 'typeorm';
import Coordinate from './coordinate';

interface PlaceParams {
    address: string
    coordinate: Coordinate
    gmapsId: string
}

export default class Place {
    constructor(params?: PlaceParams) {
        if (!params) return;
        this.address = params.address;
        this.gmapsId = params.gmapsId;
        this.coordinate = params.coordinate;
    }

    @Column()
    address!: string;

    @Column(type => Coordinate, {prefix: ''})
    coordinate!: Coordinate;

    @Column()
    gmapsId!: string;
}