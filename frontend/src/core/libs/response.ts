import { isAxiosError } from 'axios';

export type RESPONSE = {
    status: number;
    message: string;
    error: boolean;
};

export type SUCCESS_RESPONSE<T> = RESPONSE & {
    data: T;
};

export type ERROR_RESPONSE = RESPONSE & {
    data: null;
};

export class CustomError extends Error {
    response: ERROR_RESPONSE;

    constructor(response: ERROR_RESPONSE) {
        super(response.message);
        this.name = 'CustomError';
        this.response = response;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export type CustomErrorType = {
    message: string;
    response: ERROR_RESPONSE;
};

export const AxiosErrorHandler = (error: any): ERROR_RESPONSE => {
    if (isAxiosError(error)) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message,
                error: true,
                data: error.response.data.data,
            };
        } else if (error.request) {
            return {
                status: 504,
                message: 'Gateway Timeout: The server did not respond in time.',
                error: true,
                data: null,
            };
        } else {
            return {
                status: 400,
                message: 'Bad Request: The request could not be processed.',
                error: true,
                data: null,
            };
        }
    }
    return {
        status: 500,
        message: 'Internal Server Error: An error occurred on the server.',
        error: true,
        data: null,
    };
};
