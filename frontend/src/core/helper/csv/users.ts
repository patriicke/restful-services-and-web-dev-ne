import { UserType } from '~/core/types';
import { exportToCSV } from '~/core/utils';

export const exportUsers = (userData: UserType[]): string =>
    exportToCSV<UserType>(
        [
            {
                label: 'Username',
                selector: row => row.username,
            },
            {
                label: 'Email',
                selector: row => row.email,
            },
            {
                label: 'Status',
                selector: row => row.status,
            },
        ],
        userData
    );
