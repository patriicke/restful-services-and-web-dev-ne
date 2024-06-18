import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkCustomResponse } from '~/common/decorators';
import { TOKEN_NAME } from '~/constants';
import { ResponseDto } from '~/common/dtos';
import {
  ChangePasswordRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from '../users/dtos';
import { ApiUnauthorizedCustomResponse } from '~/common/decorators/api-unauthorized-custom-response.decorator';
import { NullDto } from '~/common/dtos/null.dto';
import { ApiBadRequestCustomResponse } from '~/common/decorators/api-bad-request-custom-response.decorator';
import { CurrentUser, Public, Roles } from '../auth/decorators';
import { UserEntity } from '../users/model/user.entity';
import { RequestResetPasswordDTO } from '../users/dtos/request-reset-password.dto';
import { VerifyPasswordResetOtpDTO } from '../users/dtos/verify-reset-password.dto';
import { VerifyResetPasswordResponseDto } from '../users/dtos/verify-reset-password-response.dto';
import { ResetPasswordDTO } from '../users/dtos/reset-password.dto';
import { ApiConflictCustomResponse } from '~/common/decorators/api-conflict-custom-response.decorator';

@ApiTags('Profile')
@Controller({ path: 'profile', version: '1' })
export class ProfilesController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ description: 'Get profile' })
  @ApiOkCustomResponse(UserResponseDto)
  @ApiBearerAuth(TOKEN_NAME)
  @Get('/')
  public getProfile(): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.getProfile();
  }

  @ApiOperation({ description: 'Update user by id' })
  @ApiOkCustomResponse(UserResponseDto)
  @ApiConflictCustomResponse(NullDto)
  @ApiUnauthorizedCustomResponse(NullDto)
  @ApiBearerAuth(TOKEN_NAME)
  @Patch('/')
  public updateProfile(
    @Body(ValidationPipe) UserDto: UpdateUserRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.updateProfile(user, UserDto);
  }

  @ApiOperation({ description: 'Change user password' })
  @ApiOkCustomResponse(UserResponseDto)
  @ApiUnauthorizedCustomResponse(NullDto)
  @ApiBadRequestCustomResponse(NullDto)
  @Post('/change/password')
  @ApiBearerAuth(TOKEN_NAME)
  changePassword(
    @Body(ValidationPipe) changePassword: ChangePasswordRequestDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.changePassword(changePassword, user.id);
  }

  @ApiOperation({ description: 'Request reset password' })
  @ApiOkCustomResponse(NullDto)
  @Post('/request/reset/password')
  @Public()
  requestResetPassword(
    @Body(ValidationPipe) requestResetPasswordDto: RequestResetPasswordDTO,
  ): Promise<ResponseDto<null>> {
    return this.usersService.requestResetPassword(requestResetPasswordDto);
  }

  @ApiOperation({ description: 'Verify reset password' })
  @ApiOkCustomResponse(VerifyResetPasswordResponseDto)
  @Post('/verify/reset/password')
  @Public()
  verifyResetPassword(
    @Body(ValidationPipe) verifyPasswordResetOtpDto: VerifyPasswordResetOtpDTO,
  ): Promise<ResponseDto<VerifyResetPasswordResponseDto>> {
    return this.usersService.verifyResetPassword(verifyPasswordResetOtpDto);
  }

  @ApiOperation({ description: 'Change user password' })
  @Post('/reset/password')
  @ApiOkCustomResponse(NullDto)
  @Public()
  resetPassword(
    @Body(ValidationPipe) resetPassword: ResetPasswordDTO,
  ): Promise<ResponseDto<null>> {
    return this.usersService.resetPassword(resetPassword);
  }
}
