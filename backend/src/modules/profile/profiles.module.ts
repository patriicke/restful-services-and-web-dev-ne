import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProfilesController],
  imports: [UsersModule],
})
export class ProfilesModule {}
