import { TokensType } from '../tokens';
import { UserType } from '../user';

export type AuthLoginRequestPayload = {
    username: string;
    password: string;
};

export type AuthRegisterRequestPayload = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export type AuthLoginResponsePayload = {
    tokens: TokensType;
    user: UserType;
};

export type AuthRegisterResponsePayload = {
    tokens: TokensType;
    user: UserType;
};

export type AuthLogoutRequestPayload = {
    refreshToken: string;
};

export type AuthRefreshTokenRequestPayload = {
    refreshToken: string;
};

export type AuthRefreshTokenResponsePayload = {
    tokens: TokensType;
};

export type AuthRequestResetPasswordRequestPayload = {
    email: string;
};

export type AuthVerifyResetPasswordRequestPayload = {
    otp: number;
    email: string;
};

export type AuthVerifyResetPasswordResponsePayload = {
    resetToken: string;
};

export type AuthResetPasswordRequestPayload = {
    newPassword: string;
    resetToken: string;
};
