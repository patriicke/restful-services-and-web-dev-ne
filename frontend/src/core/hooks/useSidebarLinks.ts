import {
    IconDefinition,
    faBook,
    faHouse,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { checkRoles } from '../utils/check-role';
import { useSelector } from 'react-redux';
import { RootState } from '../types/redux';

/* eslint-disable indent */
export type ISideBarLinksType = {
    name: string;
    icon: IconDefinition;
    href: string;
};

export const useSideBarLinks = (): { sidebarLinks: ISideBarLinksType[] } => {
    const userData = useSelector((state: RootState) => state.user.userData);

    return {
        sidebarLinks: [
            {
                name: 'Dashboard',
                icon: faHouse,
                href: '/dashboard',
            },
            ...(checkRoles(['admin'], userData)
                ? [
                      {
                          name: 'Users',
                          icon: faUser,
                          href: '/dashboard/users',
                      },
                  ]
                : []),

            {
                name: 'Books',
                icon: faBook,
                href: '/dashboard/books',
            },
        ],
    };
};
