import moment from 'moment';
import {plainToClass} from "class-transformer";
import {findUserById} from "./user-service";
import User from "../models/user";
import Donor from "../models/donor";
import Donation from "../models/donation";
import {getPlace} from "./place-service";
import {getMatchingBloodGroups} from "../helpers/donation-helper";

export const createDonation = async (
    params: Donation
): Promise<Donation> => {
    const user: User = (await findUserById(params.requesterId))!;
    const donation = plainToClass(Donation, params);
    donation.requester = Promise.resolve(user);
    donation.venue = await getPlace(params.venue.gmapsId);
    await donation.save();

    return donation;
};

export const userRequests = async (userId: number): Promise<Donation[] | undefined> => {
    const requests = await Donation.find({where: {requesterId: userId}});
    return requests;
};

export const userRequest = async (userId: number, requestId: number): Promise<Donation | undefined> => {
    const donation = await Donation.findOne(requestId);
    return donation;
};

export const searchDonors = async (userId: number,
                                   requestId: number,
                                   offset: number
): Promise<Donor[] | undefined> => {
    const donation = await Donation.findOne(requestId);
    if (!donation) {
        return undefined;
    }
    const matchingBloodGroups = getMatchingBloodGroups(donation.requiredBloodGroup)
        .map(bg => `'${bg}'`)
        .join(",");
    const lastDonatedDate = moment().subtract(3, 'months').toDate();
    const donors = await Donor.createQueryBuilder("donor")
        .where(`donor.blood_group in (${matchingBloodGroups})`)
        .andWhere('donor.last_donated_on is NULL or donor.last_donated_on <= :lastDonatedDate', {lastDonatedDate})
        .skip(offset)
        .limit(100)
        .getMany()
    return donors;
}