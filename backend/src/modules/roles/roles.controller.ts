import {
  ValidationPipe,
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiOkPaginatedResponse,
  PaginationParams,
  PaginationRequest,
} from '~/helpers/pagination';
import {
  ApiConflictResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  UpdateRoleRequestDto,
  CreateRoleRequestDto,
  RoleResponseDto,
} from './dtos';
import { PaginationResponseDto } from '~/helpers/pagination/pagination-response.dto';
import { RolesService } from './roles.service';
import { TOKEN_NAME } from '~/constants';
import {
  ApiCreatedCustomResponse,
  ApiOkCustomResponse,
} from '~/common/decorators';
import { ApiInternalServerErrorCustomResponse } from '~/common/decorators/api-ise-custom-response.decorator';
import { NullDto } from '~/common/dtos/null.dto';
import { ApiBadRequestCustomResponse } from '~/common/decorators/api-bad-request-custom-response.decorator';
import { ApiUnauthorizedCustomResponse } from '~/common/decorators/api-unauthorized-custom-response.decorator';
import { ApiForbiddenCustomResponse } from '~/common/decorators/api-forbidden-custom-response.decorator';
import { RoleDto } from './dtos/role.dto';
import { ResponseDto } from '~/common/dtos';
import { Roles } from '../auth/decorators';

@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
@ApiBearerAuth(TOKEN_NAME)
@ApiInternalServerErrorCustomResponse(NullDto)
@ApiBadRequestCustomResponse(NullDto)
@ApiUnauthorizedCustomResponse(NullDto)
@ApiForbiddenCustomResponse(NullDto)
@Roles('admin')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ description: 'Get a paginated roles list' })
  @ApiOkPaginatedResponse(RoleDto)
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Get()
  public getRoles(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<ResponseDto<PaginationResponseDto<RoleDto>>> {
    return this.rolesService.getRoles(pagination);
  }

  @ApiOperation({ description: 'Get role by id' })
  @ApiOkCustomResponse(RoleResponseDto)
  @Get('/:id')
  public getRoleById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<RoleResponseDto>> {
    return this.rolesService.getRoleById(id);
  }

  @ApiOperation({ description: 'Create new role' })
  @ApiCreatedCustomResponse(RoleResponseDto)
  @ApiConflictResponse({ description: 'Role already exists' })
  @Post()
  public createRole(
    @Body(ValidationPipe) roleDto: CreateRoleRequestDto,
  ): Promise<ResponseDto<RoleResponseDto>> {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiOkCustomResponse(RoleResponseDto)
  @Put('/:id')
  public updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) roleDto: UpdateRoleRequestDto,
  ): Promise<ResponseDto<RoleResponseDto>> {
    return this.rolesService.updateRole(id, roleDto);
  }
}
