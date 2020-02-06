import User from './user';
import Donor from './donor';
import Place from './place';
import DonationRequest from './donation-request';

// Create a list of all entities to be used for migration
export const entities = [User, Donor, DonationRequest, Place];
