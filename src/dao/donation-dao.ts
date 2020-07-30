import Donation from "../models/donation";

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