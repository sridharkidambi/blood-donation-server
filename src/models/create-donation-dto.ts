import Place from "./place";

export interface CreateDonationDto {
    patientName: string
    requiredBloodGroup: string
    unitsRequired: number
    venue: Place
    requiredOn?: Date
    requiredAsap: boolean
    attenderName: string
    attenderPhoneNumber: string
    requesterId: number
}