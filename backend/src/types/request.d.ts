import { Request } from 'express';
import { UserEntity } from '~/modules/users/model/user.entity';

interface UserRequest extends Request {
  user?: UserEntity;
}
