import User from './user';
import Donor from './donor';
import Place from './place';
import Donation from './donation';
import DonationDonor from "./donation-donors";

export const models = {
    User: User,
    Donor: Donor,
    Donation: Donation,
    Place: Place,
    DonationDonor: DonationDonor
};
export default [User, Donor, Donation, Place, DonationDonor];
