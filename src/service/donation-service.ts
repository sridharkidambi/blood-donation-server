import Donation from "../models/donation";
import Place from "../models/place";
import {findOrCreatePlace} from "./place-service";
import {plainToClass} from "class-transformer";
import {CreateDonationDto} from "../models/create-donation-dto";
import User from "../models/user";
import {findUserById} from "./user-service";


export const createDonation = async (
    params: CreateDonationDto
): Promise<Donation> => {

    const user: User = (await findUserById(params.requesterId))!;
    const venue: Place = await findOrCreatePlace(params.venueGmapsId);

    const donation = plainToClass(Donation, params);
    donation.requester = Promise.resolve(user);
    donation.venue = venue;
    await donation.save();

    return donation;
};
