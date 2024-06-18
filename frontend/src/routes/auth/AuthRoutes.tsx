import { RouteObject } from 'react-router-dom';
import LoginPage from '~/pages/auth/login/LoginPage';
import RegisterPage from '~/pages/auth/register/RegisterPage';
import ResetPasswordConfirmedPage from '~/pages/auth/reset-password-confirmed/ResetPasswordConfirmedPage';
import ResetPasswordSuccessPage from '~/pages/auth/reset-password-success/ResetPasswordSucess';
import ResetPasswordVerificationCode from '~/pages/auth/reset-password-verification-code/ResetPasswordVerificationCode';
import ResetPasswordPage from '~/pages/auth/reset-password/ResetPasswordPage';

export const AuthRoutes:RouteObject[] = [
    {
        path: '',
        index:true,
        element: <LoginPage />,
    },
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: 'register',
        element: <RegisterPage />,
    },
    {
        path: 'reset-password',
        element: <ResetPasswordPage />,
    },
    {
        path: 'reset-password-verification',
        element: <ResetPasswordVerificationCode />,
    },
    {
        path: 'reset-password-confirmed',
        element: <ResetPasswordConfirmedPage />,
    },
    {
        path: 'reset-password-success',
        element: <ResetPasswordSuccessPage />,
    }
];