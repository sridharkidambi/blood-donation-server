import Place from "../place";

export interface DonationDonorDto {
    userId: number;
    donorId: number;
    donationId: number;
    name: String;
    emailAddress: String;
    phoneNumber: String;
    residence: Place;
    gender: String;
    dob: Date;
    bloodGroup: String;
    lastDonatedOn?: Date;
    available: boolean;
    status: String;
}