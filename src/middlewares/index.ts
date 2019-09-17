import {
    handleCors,
    parseRequestBody,
    logRequest
} from '../middlewares/common';

// export all middlesares
export default [handleCors, parseRequestBody, logRequest];
