import Donor from '../models/donor';
import User from '../models/user';

export const createDonor = async (donor: Donor, userId: number) => {
    console.log(userId);
    const user = await User.findOne(userId);
    donor.user = user!;
    await donor.save();
};
