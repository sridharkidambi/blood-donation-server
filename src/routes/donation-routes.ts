import * as controller from '../controllers/donation-controller';
import * as validator from '../validators/donation-validator';

export default [
    {
        path: '/users/:userId/requests',
        method: 'post',
        handler: [validator.createDonationValidator, controller.createDonation]
    },
    {
        path: '/users/:userId/requests',
        method: 'get',
        handler: [controller.getUserRequests]
    },
    {
        path: '/users/:userId/requests/:requestId',
        method: 'get',
        handler: [controller.getUserRequest]
    },
    {
        path: '/users/:userId/requests/:requestId/search_donors',
        method: 'get',
        handler: [controller.searchDonors]
    }
]
