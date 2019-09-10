import axios from 'axios';
import config from '../config';

const msg91BaseUrl = 'http://api.msg91.com/api/';

export const sendOTP = async (phoneNumber: string) => {
    return await axios.get(msg91BaseUrl + 'sendotp.php', {
        params: {
            authkey: config.msg91AuthKey,
            mobile: phoneNumber,
            message: '',
            otp_expiry: 5, // in minutes
            otp_length: 6
        }
    });
};
