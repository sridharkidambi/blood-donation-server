import * as controller from '../controllers/dr-controller';
import * as validator from '../validators/dr-validator';

export default [
    {
        path: '/donation_request',
        method: 'post',
        handler: [validator.createDonationRequestValidator, controller.createRequest]
    },
]
