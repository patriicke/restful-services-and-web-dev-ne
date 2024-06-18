import jwtDecode from 'jwt-decode';

type DecodedTokenPayload = {
    sub: string;
    tid: string;
    type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
    iat: number;
    exp: number;
};

export const decodeToken = (token: string): DecodedTokenPayload => {
    try {
        const user: DecodedTokenPayload = jwtDecode(token);
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
