import DonationRequest from "./dr-model";
import Place from "../places/palce-model";
import {findOrCreatePlace} from "../places/place-service";
import {plainToClass} from "class-transformer";
import {CreateRequestDto} from "../dto/create-request-dto";
import User from "../user/user-model";
import {findUserById} from "../user/user-service";


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
