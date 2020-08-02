import Donor from '../models/donor';
import User from '../models/user';
import {getPlace} from "./place-service";

export const createDonor = async (donor: Donor, userId: number) => {
    const user = await User.findOne(userId);
    donor.user = user!;
    donor.residence = await getPlace(donor.residence.gmapsId);
    if (donor.available == null || donor.available == undefined) {
        donor.available = true;
    }
    await donor.save();
};

export const getDonor = async (userId: number) => await Donor.findOne({userId});