export default class HttpError extends Error {
    statusCode!: number;
    errors?: any[];

    static internalServerError(message: string, errors?: any[]) {
        return new HttpError(500, message, errors);
    }

    constructor(statusCode: number, message: string, errors?: any[]) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
