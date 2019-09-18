import * as validator from '../validators/donor';
import * as controller from '../controllers/donor';

export default [
    {
        path: '/donor',
        method: 'post',
        handler: [validator.createDonorValidator, controller.createDonor]
    }
];
