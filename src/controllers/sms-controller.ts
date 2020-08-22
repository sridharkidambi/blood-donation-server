import { vaildatePhoneNumber } from './../service/user-service';
import { Request, Response, NextFunction } from 'express';
import { asyncMiddleware } from '../middlewares/common';
import { sendOTP } from '../service/sms-service';
import { sendOTP_AWS } from '../service/sms-service';
import HttpError from '../errors/http-error';
import { SendMessagesResponse } from 'aws-sdk/clients/pinpoint';
import * as service from '../service/user-service';

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


export const otpCodeRequestHandler = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body.phoneNumber);
            const otpResponse = await sendOTP_AWS(req.body.phoneNumber);
            return res.status(200).json({ expiresIn: 5 * 60,opt_code: otpResponse });
        } catch (e) {}
        throw HttpError.internalServerError(
            'otp_send_failed',
            'Unable to sent OTP'
        );
    }
);

export const otpCodeValidatedRequestHandler = asyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body.phoneNumber);
            const responseData = await service.vaildatePhoneNumber(req.body.phoneNumber);
            // const otpResponse = await sendOTP_AWS(req.body.phoneNumber);
            return res.status(201).json({ updated:'phone successfully validated.' });
        } catch (e) {}
        throw HttpError.internalServerError(
            'otp_send_failed',
            'Unable to sent OTP'
        );
    }
);
