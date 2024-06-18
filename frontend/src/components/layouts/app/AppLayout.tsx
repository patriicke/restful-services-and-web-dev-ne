import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { get_profile, logout_user, refresh_token } from '~/api/auth';
import { Spinner } from '~/components/elements';
import {
    addTokensRedux,
    removeTokensRedux,
} from '~/core/redux/slices/tokensSlice';
import { adduserRedux, removeUserRedux } from '~/core/redux/slices/userSlice';
import { RootState } from '~/core/types/redux';
import { decodeToken } from '~/core/utils/decode';

const AppLayout: React.FC = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state: RootState) => state.user);
    const { tokensData } = useSelector((state: RootState) => state.tokens);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

    const handleGetProfile = async () => {
        if (tokensData.accessToken) {
            try {
                const data = await get_profile();
                const { user } = data.payload;
                dispatch(adduserRedux(user));
            } catch (error) {
                handleLogout();
            }
        }

        if (!tokensData.accessToken && userData.id) {
            handleLogout();
        }
    };

    const handleLogout = async () => {
        try {
            await logout_user({ refreshToken: tokensData.refreshToken });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(removeTokensRedux());
            dispatch(removeUserRedux());
        }
    };

    const handleRefreshToken = async () => {
        try {
            const data = await refresh_token({
                refreshToken: tokensData.refreshToken,
            });
            const { tokens } = data.payload;
            dispatch(addTokensRedux(tokens));

            const accessTokenPayload = decodeToken(tokens.accessToken);
            setRefreshInterval(
                accessTokenPayload.exp * 1000 - Date.now() - 30000
            );
        } catch (error) {
            console.log('error:', error);
            handleLogout();
        }
    };

    const handleCheckAll = async () => {
        try {
            const { accessToken, refreshToken } = tokensData;
            if (accessToken && refreshToken) {
                const accessTokenPayload = decodeToken(accessToken);
                const refreshTokenPayload = decodeToken(refreshToken);

                if (accessTokenPayload.exp * 1000 < Date.now()) {
                    if (refreshTokenPayload.exp * 1000 < Date.now()) {
                        handleLogout();
                    } else {
                        await handleRefreshToken();
                    }
                } else {
                    handleGetProfile();
                    setRefreshInterval(
                        accessTokenPayload.exp * 1000 - Date.now() - 30000
                    );
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCheckAll();
    }, []);

    useEffect(() => {
        if (refreshInterval !== null) {
            const interval = setInterval(() => {
                handleRefreshToken();
            }, refreshInterval);

            return () => clearInterval(interval);
        }
    }, [refreshInterval]);

    useEffect(() => {
        if (tokensData.accessToken) {
            const accessTokenPayload = decodeToken(tokensData.accessToken);
            setRefreshInterval(
                accessTokenPayload.exp * 1000 - Date.now() - 30000
            );
        }
    }, [tokensData]);

    if (loading)
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <Spinner size="sm" />
            </div>
        );

    return <Outlet />;
};

export default AppLayout;
