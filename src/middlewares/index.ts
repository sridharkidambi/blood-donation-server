import {
    handleCors,
    parseRequestBody,
    logRequest
} from '../middlewares/common';
import { handleApiDocs } from '../middlewares/api-docs';

// export all middlesares
export default [handleCors, parseRequestBody, handleApiDocs, logRequest];
