import * as controller from '../controllers/donation-controller';
import * as validator from '../validators/donation-validator';

export default [
    {
        path: '/donation_request',
        method: 'post',
        handler: [validator.createDonationValidator, controller.createRequest]
    },
]
