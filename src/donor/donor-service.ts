import Donor from './donor-model';
import User from '../user/user-model';

export const createDonor = async (donor: Donor, userId: number) => {
    console.log(userId);
    const user = await User.findOne(userId);
    donor.user = user!;
    await donor.save();
};
