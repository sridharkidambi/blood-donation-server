import { otpRequestValidator } from './sms-validator';
import { otpRequestHandler } from './sms-controller';

export default [
    {
        path: '/send_otp',
        method: 'post',
        handler: [otpRequestValidator, otpRequestHandler]
    }
];
