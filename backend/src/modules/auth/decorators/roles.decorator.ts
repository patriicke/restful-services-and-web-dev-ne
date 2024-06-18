import { SetMetadata } from '@nestjs/common';
import { ROLES } from '~/constants';

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);
