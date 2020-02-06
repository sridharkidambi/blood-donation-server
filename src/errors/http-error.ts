export default class HttpError extends Error {
    statusCode!: number;
    errorCode!: string;

    constructor(statusCode: number, errorCode: string, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }

    static badRequest(errorCode: string, message: string) {
        return new HttpError(400, errorCode, message);
    }

    static unauthorized(errorCode: string, message: string) {
        return new HttpError(401, errorCode, message);
    }

    static notFound(errorCode: string, message: string) {
        return new HttpError(404, errorCode, message);
    }

    static unprocessableEntity(errorCode: string, message: string) {
        return new HttpError(422, errorCode, message);
    }

    static internalServerError(errorCode: string, message: string) {
        return new HttpError(500, errorCode, message);
    }

}
