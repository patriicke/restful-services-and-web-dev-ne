import { BaseType } from '../base';
import { RoleType } from '../role';

export type UserType = BaseType & {
    username: string;
    phoneNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    roles?: RoleType[];
};
