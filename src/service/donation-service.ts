import moment from 'moment';
import {plainToClass} from "class-transformer";
import {findUserById} from "./user-service";
import User from "../models/user";
import Donor from "../models/donor";
import Donation from "../models/donation";
import {getPlace} from "./place-service";
import {getMatchingBloodGroups} from "../helpers/donation-helper";
import * as dao from '../dao/donation-dao';
import DonationDonor from "../models/donation-donors";
import {DonationDto} from "../models/dto/donation-dto";
import {DonationDonorDto} from "../models/dto/donation-donor-dto";
import HttpError from "../errors/http-error";

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

export const userRequest = async (userId: number, requestId: number): Promise<DonationDto> => {
    const donation: Donation | undefined = await dao.getDonation(requestId);
    if (donation == undefined) {
        throw HttpError.notFound("not_found", `Donation with id ${requestId} not found`);
    }
    const donors: DonationDonorDto[] = donation.donationDonors.map((dd: DonationDonor) => {
        const ddd: DonationDonorDto = {
            userId: dd.donor.user.id,
            available: dd.donor.available,
            bloodGroup: dd.donor.bloodGroup,
            dob: dd.donor.dob,
            donationId: donation.id,
            donorId: dd.donor.id,
            emailAddress: dd.donor.user.emailAddress,
            gender: dd.donor.gender,
            lastDonatedOn: dd.donor.lastDonatedOn,
            name: dd.donor.user.name,
            phoneNumber: dd.donor.user.phoneNumber,
            residence: dd.donor.residence,
            status: dd.status
        };
        return ddd;
    });
    const donationDto: DonationDto = {
        attenderName: donation.attenderName,
        attenderPhoneNumber: donation.attenderPhoneNumber,
        notes: donation.notes,
        patientName: donation.patientName,
        requester: await donation.requester,
        requiredAsap: donation.requiredAsap,
        requiredBloodGroup: donation.requiredBloodGroup,
        requiredOn: donation.requiredOn,
        unitsRequired: donation.unitsRequired,
        venue: donation.venue,
        donors: donors
    };
    return donationDto;
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