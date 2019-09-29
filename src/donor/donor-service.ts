import Donor from './donor';
import User from '../user/user-model';

export const createDonor = async (donor: Donor, userId: number) => {
    const user = await User.findOne(userId);
    donor.user = user!;
    await donor.save();
};
