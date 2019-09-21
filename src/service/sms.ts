import axios from 'axios';
import config from '../config';

const msg91BaseUrl = 'http://api.msg91.com/api';

export enum OtpVerificationResult {
    verified = 'verified',
    otp_not_requested = 'otp_not_requested',
    incorrect_otp = 'incorrect_otp',
    unknown_failure = 'unknown_failure'
}

export const sendOTP = async (phoneNumber: string) => {
    const sendOtpUrl = `${msg91BaseUrl}/sendotp.php`;
    const params = {
        authkey: config.msg91AuthKey,
        mobile: phoneNumber,
        message: '',
        otp_expiry: 5, // in minutes
        otp_length: 6
    };
    return await axios.get(sendOtpUrl, { params });
};

export const verifyOtp = async (
    phoneNumber: string,
    otp: number
): Promise<OtpVerificationResult> => {
    const verifyOtpUrl = `${msg91BaseUrl}/verifyRequestOTP.php`;
    const params = {
        authkey: config.msg91AuthKey,
        mobile: phoneNumber,
        otp
    };
    try {
        const response = await axios.post(verifyOtpUrl, { params });
        switch (response.data.type) {
            case 'success':
                return OtpVerificationResult.verified;
            case 'mobile_not_found':
                return OtpVerificationResult.otp_not_requested;
            case 'otp_not_verified':
                return OtpVerificationResult.incorrect_otp;
        }
    } catch (e) {}
    return OtpVerificationResult.unknown_failure;
};
