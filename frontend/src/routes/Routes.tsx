import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from '~/components/layouts/app/AppLayout';
import AuthPageLayout from '~/components/layouts/auth/AuthPageLayout';
import { AuthRouteProtector } from '~/core/protector/auth/AuthProtector';
import { NotFoundPage } from '~/pages/notfound/NotFoundPage';
import { AuthRoutes } from './auth/AuthRoutes';
import { DashboardProtector } from '~/core/protector/dashboard/DashboardProtector';
import { DashboardPageLayout } from '~/components/layouts/dashboard/DashboardPageLayout';
import { useDashboardRoutes } from './dashboard/useDashboardRoutes';

export const Routes = () => {
    const { dashboardRoutes } = useDashboardRoutes();

    return useRoutes([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to={'/auth/login'} />,
                },
                {
                    path: 'auth',
                    element: (
                        <AuthRouteProtector element={<AuthPageLayout />} />
                    ),
                    children: AuthRoutes,
                },
                {
                    path: 'dashboard',
                    element: (
                        <DashboardProtector element={<DashboardPageLayout />} />
                    ),
                    children: dashboardRoutes,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
};
