import { getUser, createUser, updateUser, login } from '../controllers/user';
import {
    createUserValidator,
    loginValidator,
    updateUserValidator
} from '../validators/user';

export default [
    {
        path: '/user/:user_id',
        method: 'get',
        handler: [getUser]
    },
    {
        path: '/user',
        method: 'post',
        handler: [createUserValidator, createUser]
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
    }
];
