import * as controller from '../controllers/user';
import * as validator from '../validators/user';

export default [
    {
        path: '/user/:user_id',
        method: 'get',
        handler: [validator.getUserValidator, controller.getUser]
    },
    {
        path: '/user',
        method: 'put',
        handler: [validator.updateUserValidator, controller.updateUser]
    },
    {
        path: '/login',
        method: 'post',
        handler: [validator.loginValidator, controller.login]
    },
    {
        path: '/register',
        method: 'post',
        handler: [validator.registerUserValidator, controller.registerUser]
    }
];
