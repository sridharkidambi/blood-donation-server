import * as controller from './dr-controller';
import * as validator from './dr-validator';

export default [
    {
        path: '/donation_request',
        method: 'post',
        handler: [validator.createDonationRequestValidator, controller.createRequest]
    },
]
