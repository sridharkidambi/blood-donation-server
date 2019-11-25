export interface CreateRequestDto {
    patientName: string
    requiredBloodGroup: string
    unitsRequired: number
    requiredOn?: Date
    requiredAsap: boolean
    attenderName: string
    attenderPhoneNumber: string
    venueGmapsId: string
    requesterId: number
}
