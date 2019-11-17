import * as controller from './dr-controller';

export default [
    {
        path: '/donation_request',
        method: 'post',
        handler: [controller.createRequest]
    }
]
