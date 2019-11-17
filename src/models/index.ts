import User from '../user/user-model';
import Donor from '../donor/donor-model';
import Place from '../places/palce-model';
import DonationRequest from '../donation-request/dr-model';

// Create a list of all entities to be used for migration
export const entities = [User, Donor, DonationRequest, Place];
