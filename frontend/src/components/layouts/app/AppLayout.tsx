import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { get_profile, refresh_token } from '~/api/auth';
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
    const [hasAttemptedRefresh, setHasAttemptedRefresh] =
        useState<boolean>(false);
    const [hasAttemptedProfile, setHasAttemptedProfile] =
        useState<boolean>(false);

    const handleGetProfile = async () => {
        if (tokensData.accessToken) {
            try {
                const data = await get_profile();
                const { user } = data.payload;
                dispatch(adduserRedux(user));
                setHasAttemptedProfile(true);
            } catch (error) {
                handleClearData();
            }
        }

        if (!tokensData.accessToken && userData.id) {
            handleClearData();
        }
    };

    const handleClearData = async () => {
        dispatch(removeTokensRedux());
        dispatch(removeUserRedux());
        setHasAttemptedRefresh(false);
    };

    const handleRefreshToken = async () => {
        if (!hasAttemptedRefresh) {
            setHasAttemptedRefresh(true);
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

                if (!hasAttemptedProfile) await handleGetProfile();
            } catch (error) {
                console.log('error:', error);
                handleClearData();
            }
        }
    };

    const handleCheckAll = async () => {
        try {
            const { accessToken, refreshToken } = tokensData;
            if (accessToken && refreshToken) {
                const accessTokenPayload = decodeToken(accessToken);
                const refreshTokenPayload = decodeToken(refreshToken);

                if (accessTokenPayload.exp * 1000 < Date.now()) {
                    if (
                        refreshTokenPayload.exp * 1000 < Date.now() ||
                        hasAttemptedRefresh
                    ) {
                        handleClearData();
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
    }, [tokensData]);

    useEffect(() => {
        if (refreshInterval !== null && tokensData.refreshToken) {
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
