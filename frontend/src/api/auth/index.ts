import { ResponseType } from '~/core/types/response';
import { AxiosErrorHandler, CustomError } from '~/core/libs';
import {
    AuthLoginRequestPayload,
    AuthLoginResponsePayload,
    AuthLogoutRequestPayload,
    AuthRefreshTokenRequestPayload,
    AuthRefreshTokenResponsePayload,
    AuthRegisterRequestPayload,
    AuthRegisterResponsePayload,
    AuthRequestResetPasswordRequestPayload,
    AuthResetPasswordRequestPayload,
    AuthVerifyResetPasswordRequestPayload,
    AuthVerifyResetPasswordResponsePayload,
} from '~/core/types/auth';
import { ProfileType } from '~/core/types/profile';
import PRIVATE_API from '../axios';

export const register_user = async (
    payload: AuthRegisterRequestPayload
): Promise<ResponseType<AuthRegisterResponsePayload>> => {
    try {
        const request = await PRIVATE_API.post('/auth/register', payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const login_user = async (
    payload: AuthLoginRequestPayload
): Promise<ResponseType<AuthLoginResponsePayload>> => {
    try {
        const request = await PRIVATE_API.post('/auth/login', payload);
        return await request.data;
    } catch (error: any) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const get_profile = async (): Promise<ResponseType<ProfileType>> => {
    try {
        const request = await PRIVATE_API.get('/profile');
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const logout_user = async (
    payload: AuthLogoutRequestPayload
): Promise<ResponseType<null>> => {
    try {
        const request = await PRIVATE_API.post('/auth/logout', payload);
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const refresh_token = async (
    payload: AuthRefreshTokenRequestPayload
): Promise<ResponseType<AuthRefreshTokenResponsePayload>> => {
    try {
        const request = await PRIVATE_API.post('/auth/refresh-token', payload);
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const request_reset_password = async (
    payload: AuthRequestResetPasswordRequestPayload
) => {
    try {
        const request = await PRIVATE_API.post(
            '/profile/request/reset/password',
            payload
        );
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const verify_reset_password = async (
    payload: AuthVerifyResetPasswordRequestPayload
): Promise<ResponseType<AuthVerifyResetPasswordResponsePayload>> => {
    try {
        const request = await PRIVATE_API.post(
            '/profile/verify/reset/password',
            payload
        );
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};

export const reset_password = async (
    payload: AuthResetPasswordRequestPayload
) => {
    try {
        const request = await PRIVATE_API.post(
            '/profile/reset/password',
            payload
        );
        return request.data;
    } catch (error) {
        throw new CustomError(AxiosErrorHandler(error));
    }
};
