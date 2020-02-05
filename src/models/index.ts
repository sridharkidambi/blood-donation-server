import User from './user-model';
import Donor from './donor-model';
import Place from './palce-model';
import DonationRequest from './dr-model';

// Create a list of all entities to be used for migration
export const entities = [User, Donor, DonationRequest, Place];
