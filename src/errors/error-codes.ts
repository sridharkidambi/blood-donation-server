export const ErrorCodes = {
    validationError: 'validation_error',
    alreadyExist: 'already_exists',
    tokenMissing: 'token_missing',
    tokenInvalid: 'token_invalid',
    methodNotFound: 'method_not_found',
    notFound: 'not_found',
    wrongCredentials: 'wrong_credentials',
    failed: 'failed'
};

export const ErrorMessage = {
    validationError: 'The required fields are missing in the request',
    alreadyExist: 'The resource requested to be created already exists',
    tokenMissing: 'Authtoken missing in the request headers',
    tokenInvalid: 'The provided auth token is invalid',
    methodNotFound: 'The requested URI does not exist',
    wrongCredentials: 'The user id or password is wrong'
};
