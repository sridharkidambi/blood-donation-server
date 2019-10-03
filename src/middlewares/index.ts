import {
    handleCors,
    parseRequestBody,
    logRequest
} from '../middlewares/common';
import { verify } from './auth-middleware';

// export all middlesares
export default [handleCors, parseRequestBody, logRequest];
