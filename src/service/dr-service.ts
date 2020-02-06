import DonationRequest from "../models/donation-request";
import Place from "../models/place";
import {findOrCreatePlace} from "./place-service";
import {plainToClass} from "class-transformer";
import {CreateRequestDto} from "../models/create-request-dto";
import User from "../models/user";
import {findUserById} from "./user-service";


export const createDonationRequest = async (
    params: CreateRequestDto
): Promise<DonationRequest> => {

    const user: User = (await findUserById(params.requesterId))!;
    const venue: Place = await findOrCreatePlace(params.venueGmapsId);

    const donationRequest = plainToClass(DonationRequest, params);
    donationRequest.requester = Promise.resolve(user);
    donationRequest.venue = venue;
    await donationRequest.save();

    return donationRequest;
};
