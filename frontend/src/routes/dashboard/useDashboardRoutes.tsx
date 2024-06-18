import { useSelector } from 'react-redux';
import { RouteObject } from 'react-router-dom';
import { RootState } from '~/core/types/redux';
import { checkRoles } from '~/core/utils/check-role';
import { DashboardPage } from '~/pages/dashboard';
import { BooksPage } from '~/pages/dashboard/books';
import { UsersPage } from '~/pages/dashboard/users';

export const useDashboardRoutes = (): { dashboardRoutes: RouteObject[] } => {
    const userData = useSelector((state: RootState) => state.user.userData);

    const routes: RouteObject[] = [
        {
            index: true,
            element: <DashboardPage />,
        },
    ];

    if (checkRoles(['admin'], userData)) {
        routes.push({
            path: 'users',
            element: <UsersPage />,
        });
    }

    routes.push({
        path: 'books',
        element: <BooksPage />,
    });

    return { dashboardRoutes: routes };
};
