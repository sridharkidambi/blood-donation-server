import * as validator from '../validators/donor-validator';
import * as controller from '../donor/donor-controller';

export default [
    {
        path: '/donor',
        method: 'post',
        handler: [validator.createDonorValidator, controller.createDonor]
    }
];
