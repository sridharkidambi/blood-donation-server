import { otpRequestValidator } from '../validators/sms-validator';
import { otpRequestHandler } from '../controllers/sms-controller';

export default [
    {
        path: '/send_otp',
        method: 'post',
        handler: [otpRequestValidator, otpRequestHandler]
    }
];
