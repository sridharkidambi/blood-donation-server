import Place from "../place";

export interface DonationDonorDto {
    userId: number;
    donorId: number;
    donationId: number;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    residence: Place;
    gender: string;
    dob: Date;
    bloodGroup: string;
    lastDonatedOn?: Date;
    available: boolean;
    status: string;
}