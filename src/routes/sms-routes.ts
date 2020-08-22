import { otpRequestValidator } from '../validators/sms-validator';
import { otpRequestHandler, otpCodeValidatedRequestHandler } from '../controllers/sms-controller';
import { otpCodeValidator } from '../validators/sms-validator';
import { otpCodeRequestHandler } from '../controllers/sms-controller';

export default [
    // {
    //     path: '/send_otp',
    //     method: 'post',
    //     handler: [otpRequestValidator, otpRequestHandler]
    // },

    {
        path: '/validate_otp',
        method: 'post',
        handler: [ otpCodeValidator, otpCodeRequestHandler]
    },{
        path: '/validated_otp',
        method: 'post',
        handler: [ otpCodeValidator, otpCodeValidatedRequestHandler]
    },
];
