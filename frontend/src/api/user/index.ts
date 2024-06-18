import { AxiosErrorHandler, CustomError } from '~/core/libs';
import { UserType } from '~/core/types';
import { PaginationType } from '~/core/types/pagination';
import { queryString } from '~/core/utils';
import PRIVATE_API from '../axios';
import { ResponseType } from '~/core/types/response';

export const check_user = async (): Promise<UserType> => {
    try {
        const request = await PRIVATE_API.get('/users/check');
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const get_users = async (
    query?: string
): Promise<ResponseType<PaginationType<UserType>>> => {
    try {
        const request = await PRIVATE_API.get(`/users${queryString(query)}`);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const change_password = async <T>(payload: T) => {
    try {
        const request = await PRIVATE_API.post(
            '/users/update-password',
            payload
        );
        return request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
