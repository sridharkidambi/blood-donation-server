import { getUser, createUser, updateUser, login } from '../controllers/user';
import {
    getUserValidator,
    createUserValidator,
    loginValidator,
    updateUserValidator
} from '../validators/user';

export default [
    {
        path: '/user/:user_id',
        method: 'get',
        handler: [getUserValidator, getUser]
    },
    {
        path: '/user',
        method: 'put',
        handler: [updateUserValidator, updateUser]
    },
    {
        path: '/login',
        method: 'post',
        handler: [loginValidator, login]
    },
    {
        path: '/user',
        method: 'post',
        handler: [createUserValidator, createUser]
    }
];
