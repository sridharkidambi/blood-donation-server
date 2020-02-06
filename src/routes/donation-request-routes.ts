import * as controller from '../controllers/donation-request-controller';
import * as validator from '../validators/dr-validator';

export default [
    {
        path: '/donation_request',
        method: 'post',
        handler: [validator.createDonationRequestValidator, controller.createRequest]
    },
]
