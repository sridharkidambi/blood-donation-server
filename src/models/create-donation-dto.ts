export interface CreateDonationDto {
    patientName: string
    requiredBloodGroup: string
    unitsRequired: number
    venueGmapsId: string
    requiredOn?: Date
    requiredAsap: boolean
    attenderName: string
    attenderPhoneNumber: string
    requesterId: number
}