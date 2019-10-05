import User from '../user/user-model';
import Donor from '../donor/donor-model';
import Hospital from '../hopital/hospital-model';
import DonationRequest from '../donation-request/donation-request-model';

// Create a list of all entites to be used for migration
export const entities = [User, Donor, DonationRequest, Hospital];
