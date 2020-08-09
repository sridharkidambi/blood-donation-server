import BloodGroup from "../blood-group";
import Coordinate from "../coordinate";

export interface SearchDonorDto {
    id: number;
    name: string;
    gender: string;
    emailAddress: string;
    phoneNumber: string;
    bloodGroup: BloodGroup;
    distance: number;
    coordinate: Coordinate;
}