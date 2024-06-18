import { UserType } from '../types';

export const checkRoles = (roles: string[], user: UserType): boolean => {
    return roles.some(role => user?.roles?.map(r => r.name).includes(role));
};
