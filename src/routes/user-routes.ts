import * as controller from '../controllers/user-controller';
import * as validator from '../validators/user-validator';
import {routeMaker} from "../common/utils";

const route = routeMaker('user');

export default [
    {
        path: route.single(''),
        method: 'get',
        handler: [validator.getUserValidator, controller.getUser]
    },
    {
        path: route.collection(''),
        method: 'put',
        handler: [validator.updateUserValidator, controller.updateUser]
    },
    {
        path: route.collection('/login'),
        method: 'post',
        noAuth: true,
        handler: [validator.loginValidator, controller.login]
    },
    {
        path: route.collection('/register'),
        method: 'post',
        noAuth: true,
        handler: [validator.registerUserValidator, controller.registerUser]
    },
    {
        path: route.single('/donation_requests'),
        method: 'get',
        handler: [controller.getUserDonationRequests]
    }
];
