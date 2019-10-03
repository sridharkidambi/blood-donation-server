import * as controller from './user-controller';
import * as validator from './user-validator';

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
        noAuth: true,
        handler: [validator.loginValidator, controller.login]
    },
    {
        path: '/register',
        method: 'post',
        noAuth: true,
        handler: [validator.registerUserValidator, controller.registerUser]
    }
];
