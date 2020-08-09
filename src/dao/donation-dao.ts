import Donation from "../models/donation";
import Donor from "../models/donor";
import Coordinate from "../models/coordinate";

export const getDonation = async (id: number): Promise<Donation | undefined> => {
    return Donation.findOne({
        where: {id},
        join: {
            alias: "donation",
            leftJoinAndSelect: {
                "donationDonors": "donation.donationDonors",
                "donor": "donationDonors.donor",
                "user": "donor.user"
            }
        }
    });
}

interface GetDonorsParams {
    bloodGroups: string[],
    minLastDonatedOn: string,
    coordinate: Coordinate,
    limit: number,
    offset: number
}

export const getDonors = async (params: GetDonorsParams): Promise<any[] | undefined> => {
    return Donor.createQueryBuilder("donor")
        .addSelect(`earth_distance(
            ll_to_earth(donor.residence_latitude, donor.residence_longitude),
            ll_to_earth(${params.coordinate.latitude}, ${params.coordinate.longitude})
        ) distance`.replace("\n", ""))
        .innerJoinAndSelect("donor.user", "user")
        .where("donor.blood_group in (:...bloodGroups)", {bloodGroups: params.bloodGroups})
        .andWhere("(donor.last_donated_on <= :minLastDonatedOn OR donor.last_donated_on IS NULL)",
            {minLastDonatedOn: params.minLastDonatedOn})
        .orderBy("distance")
        .limit(params.limit)
        .skip(params.offset)
        .getRawMany();
}