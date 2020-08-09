import User from "../user";
import Place from "../place";
import BloodGroup from "../blood-group";
import {DonationDonorDto} from "./donation-donor-dto";

export interface DonationDto {
    id: number,
    requester: User,
    venue: Place,
    patientName: string,
    requiredBloodGroup: BloodGroup,
    unitsRequired: number,
    requiredOn?: Date,
    requiredAsap: boolean,
    attenderName: string,
    attenderPhoneNumber: string,
    notes?: string,
    donors: DonationDonorDto[]
}