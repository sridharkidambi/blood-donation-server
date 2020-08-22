import { AddressParam } from './../models/address';
import axios from 'axios';
import config from '../config';
import { Http2ServerResponse } from 'http2';
import AWS from 'aws-sdk'
import { SendMessagesResponse } from 'aws-sdk/clients/pinpoint';
// import * as pinpoint from '@aws-cdk/aws-pinpoint';

// const AWS = require('aws-sdk');

// const aws_region = "us-east-1";
// const originationNumber = "51457";
// const OTP=between(1000,9999);
// const message = "your OTP for RSSHSS Blood APP is : "
//             +  OTP;
// const applicationId = "91ed0ebe57e941bba846b7eb2e89bb42";
// const destinationNumber = "+919344682289";
// const messageType = "TRANSACTIONAL";
// const registeredKeyword = "RSSHSS";
// const senderId = "RSSHSS01";
// const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
// AWS.config.credentials = credentials;
// AWS.config.update({region:aws_region});
// const pinpoint = new AWS.Pinpoint();


function between(min:number, max:number) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }


  

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

export const sendOTP_AWS = async (phoneNumber: string) => {
    phoneNumber="+91"+phoneNumber;
    console.log("Sk is in the aws otp method");
    // const AWS = require('aws-sdk');

    const aws_region = "us-east-1";
    const originationNumber = "51457";
    const OTP=between(1000,9999);
    const message = "your OTP for RSSHSS Blood APP is : "
                +  OTP;
    const applicationId = config.applicationId;
    const messageType = "TRANSACTIONAL";
    const registeredKeyword = "RSSHSS";
    const senderId = "RSSHSS01";
    const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
    AWS.config.credentials = credentials;
    AWS.config.update({region:aws_region});
    var pinpoint = new AWS.Pinpoint();

    const  params_aws = {
        ApplicationId: applicationId,
        MessageRequest: {
          Addresses: {
              
            [phoneNumber]: {
              ChannelType: 'SMS'
            }
          },
          MessageConfiguration: {
            SMSMessage: {
              Body: message,
              Keyword: registeredKeyword,
              MessageType: messageType,
              SenderId: senderId,
            }
          }
        }
      };

    // params_aws.MessageRequest.Addresses.AddressParam=phoneNumber;
    try{
      
       var resp1=  pinpoint.sendMessages(params_aws).promise();
      return await resp1.then(function(data:SendMessagesResponse) {
        return OTP;
      }).catch(function(err) {
        console.log(err);
        return "error while sending";
      });
      
    }catch(e){
      console.log('output error is :'+e)
    }
};

export const verifyOtp = async (
    phoneNumber: string,
    otp: number
): Promise<OtpVerificationResult> => {
    //TODO: REMOVE
    if (otp == 999999) {
        return OtpVerificationResult.verified;
    }

    const verifyOtpUrl = `${msg91BaseUrl}/verifyRequestOTP.php`;
    const params = {
        authkey: config.msg91AuthKey,
        mobile: phoneNumber,
        otp
    };
    try {
        const response = await axios.get(verifyOtpUrl, { params });
        switch (response.data.message) {
            case 'success':
                return OtpVerificationResult.verified;
            case 'mobile_not_found':
                return OtpVerificationResult.otp_not_requested;
            case 'otp_not_verified':
                return OtpVerificationResult.incorrect_otp;
        }
        console.warn(response.data);
    } catch (e) {
        console.warn(e);
    }
    return OtpVerificationResult.unknown_failure;
};
