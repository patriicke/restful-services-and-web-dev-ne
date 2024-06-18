import {
  ValidationPipe,
  ParseUUIDPipe,
  Controller,
  Param,
  Post,
  Body,
  Get,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiOkPaginatedResponse,
  PaginationParams,
  PaginationRequest,
} from '~/helpers/pagination';
import {
  ChangePasswordRequestDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dtos';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { PaginationResponseDto } from '~/helpers/pagination/pagination-response.dto';
import { RequestResetPasswordDTO } from './dtos/request-reset-password.dto';
import { VerifyPasswordResetOtpDTO } from './dtos/verify-reset-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { TOKEN_NAME } from '~/constants';
import {
  ApiCreatedCustomResponse,
  ApiOkCustomResponse,
} from '~/common/decorators';
import { UserEntity } from './model/user.entity';
import { ResponseDto } from '~/common/dtos';
import { UserDto } from './dtos/user.dto';
import { VerifyResetPasswordResponseDto } from './dtos/verify-reset-password-response.dto';
import { ApiInternalServerErrorCustomResponse } from '~/common/decorators/api-ise-custom-response.decorator';
import { NullDto } from '~/common/dtos/null.dto';
import { ApiBadRequestCustomResponse } from '~/common/decorators/api-bad-request-custom-response.decorator';
import { ApiUnauthorizedCustomResponse } from '~/common/decorators/api-unauthorized-custom-response.decorator';
import { ApiForbiddenCustomResponse } from '~/common/decorators/api-forbidden-custom-response.decorator';
import { ApiConflictCustomResponse } from '~/common/decorators/api-conflict-custom-response.decorator';
import { RemoveRolesFromUserRequestDto } from './dtos/remove-roles-request.dto';
import { AddRolesToUserRequestDto } from './dtos/add-roles-request.dto';
import { CurrentUser, Public, Roles } from '../auth/decorators';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
@ApiInternalServerErrorCustomResponse(NullDto)
@ApiBadRequestCustomResponse(NullDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ description: 'Get a paginated users list' })
  @ApiOkPaginatedResponse(UserDto)
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'roles',
    type: 'boolean',
    required: false,
  })
  @Roles('admin')
  @ApiOkPaginatedResponse(UserDto)
  @ApiUnauthorizedCustomResponse(NullDto)
  @ApiForbiddenCustomResponse(NullDto)
  @ApiBearerAuth(TOKEN_NAME)
  @Get()
  public getUsers(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<ResponseDto<PaginationResponseDto<UserDto>>> {
    return this.usersService.getUsers(pagination);
  }

  @ApiOperation({ description: 'Get user by id' })
  @ApiOkCustomResponse(UserResponseDto)
  @Roles('admin')
  @ApiBearerAuth(TOKEN_NAME)
  @ApiQuery({
    name: 'roles',
    type: 'boolean',
    required: false,
  })
  @Get('/:id')
  public getUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('roles') roles?: string,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.getUserById(id, { roles });
  }

  @ApiOperation({ description: 'Create new user' })
  @ApiCreatedCustomResponse(UserResponseDto)
  @ApiConflictCustomResponse(NullDto)
  @ApiUnauthorizedCustomResponse(NullDto)
  @ApiBearerAuth(TOKEN_NAME)
  @Roles('admin')
  @Post()
  public createUser(
    @Body(ValidationPipe) userDto: CreateUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ description: 'Update user by id' })
  @ApiOkCustomResponse(UserResponseDto)
  @ApiConflictCustomResponse(NullDto)
  @ApiUnauthorizedCustomResponse(NullDto)
  @Roles('user')
  @ApiBearerAuth(TOKEN_NAME)
  @Patch('/:id')
  public updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) UserDto: UpdateUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.updateUser(id, UserDto);
  }

  @ApiOperation({ description: 'Add roles to user by id' })
  @ApiOkCustomResponse(UserResponseDto)
  @ApiBearerAuth(TOKEN_NAME)
  @Patch('/:id/add-roles')
  @Roles('admin')
  public addRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) addRoles: AddRolesToUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.addRoles(id, addRoles);
  }

  @ApiOperation({ description: 'Remove roles from user by id' })
  @ApiOkCustomResponse(UserResponseDto)
  @ApiBearerAuth(TOKEN_NAME)
  @Patch('/:id/remove-roles')
  @Roles('admin')
  public removeRelos(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    removeRolesDto: RemoveRolesFromUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    return this.usersService.removeRoles(id, removeRolesDto);
  }
}
