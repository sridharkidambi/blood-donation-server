import { handleCors, logRequest, parseRequestBody } from './common';

export default [
    handleCors,
    parseRequestBody,
    logRequest
];
