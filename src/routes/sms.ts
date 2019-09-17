import { otpRequestValidator } from '../validators/sms';
import { otpRequestHandler } from '../controllers/sms';

export default [
    {
        path: '/send_otp',
        method: 'post',
        handler: [otpRequestValidator, otpRequestHandler]
    }
];
