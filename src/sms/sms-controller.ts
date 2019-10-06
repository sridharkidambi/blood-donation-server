import { Request, Response, NextFunction } from 'express';
import { asyncMiddleware } from '../middlewares/common';
import { sendOTP } from './sms-service';
import HttpError from '../errors/http-error';

export const otpRequestHandler = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const otpResponse = await sendOTP(req.body.phoneNumber);
            if (otpResponse.data.type === 'success') {
                return res.status(200).json({ expiresIn: 5 * 60 });
            }
        } catch (e) {}
        throw HttpError.internalServerError(
            'otp_send_failed',
            'Unable to sent OTP'
        );
    }
);
