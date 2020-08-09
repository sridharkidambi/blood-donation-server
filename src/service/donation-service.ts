import moment from 'moment';
import {plainToClass} from "class-transformer";
import {findUserById} from "./user-service";
import User from "../models/user";
import Donation from "../models/donation";
import {getPlace} from "./place-service";
import {getMatchingBloodGroups} from "../helpers/donation-helper";
import * as dao from '../dao/donation-dao';
import DonationDonor from "../models/donation-donors";
import {DonationDto} from "../models/dto/donation-dto";
import {DonationDonorDto} from "../models/dto/donation-donor-dto";
import HttpError from "../errors/http-error";
import {SearchDonorDto} from "../models/dto/search-donor-dto";
import Coordinate from "../models/coordinate";

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
        id: donation.id,
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

export const getSuitableDonors = async (requestId: number, offset: number):
    Promise<SearchDonorDto[] | undefined> => {
    const donation = await Donation.findOne(requestId);
    if (!donation) {
        return undefined;
        throw HttpError.notFound("missing_donation_request", "Donation request does not exist");
    }
    let result: any[] = await dao.getDonors({
        bloodGroups: getMatchingBloodGroups(donation.requiredBloodGroup),
        minLastDonatedOn: moment().subtract(3, 'months').format("yyyy-MM-DD"),
        coordinate: donation.venue.coordinate,
        limit: 100,
        offset: offset
    }) || [];
    const donors: SearchDonorDto[] = [];
    result.forEach(item => {
        const donor: SearchDonorDto = {
            id: item.donor_id,
            name: item.user_name,
            gender: item.donor_gender,
            bloodGroup: item.donor_blood_group,
            emailAddress: item.user_email_address,
            phoneNumber: item.user_phone_number,
            coordinate: new Coordinate({
                latitude: item.donor_residence_latitude,
                longitude: item.donor_residence_longitude
            }),
            distance: +(item.distance / 1000).toFixed(2)
        };
        donors.push(donor);
    });
    return donors;
}