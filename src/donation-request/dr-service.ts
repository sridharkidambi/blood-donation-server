import DonationRequest from "./dr-model";
import User from "../user/user-model";

export const createDonationRequest = async (
    user: User,
    request: DonationRequest): Promise<DonationRequest> => {

    request.requester = Promise.resolve(user);
    await request.save();
    return request;
};
