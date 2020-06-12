import * as controller from '../controllers/user-controller';
import * as validator from '../validators/user-validator';
import { routeMaker } from "../common/utils";

const route = routeMaker('user');

export default [
    {
        path: '/users/:userId',
        method: 'get',
        handler: [validator.getUserValidator, controller.getUser]
    },
    {
        path: '/users',
        method: 'put',
        handler: [validator.updateUserValidator, controller.updateUser]
    },
    {
        path: '/users/login',
        method: 'post',
        noAuth: true,
        handler: [validator.loginValidator, controller.login]
    },
    {
        path: '/users/register',
        method: 'post',
        noAuth: true,
        handler: [validator.registerUserValidator, controller.registerUser]
    }
];
