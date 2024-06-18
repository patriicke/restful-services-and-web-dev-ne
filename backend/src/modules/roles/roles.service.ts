import {
  InternalServerErrorException,
  RequestTimeoutException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PaginationRequest } from '~/helpers/pagination';
import {
  CreateRoleRequestDto,
  UpdateRoleRequestDto,
  RoleResponseDto,
} from './dtos';
import { DBErrorCode } from '~/common/enums';
import { RoleMapper } from './role.mapper';
import { TimeoutError } from 'rxjs';
import { handlePaginate } from '~/helpers/pagination/pagination.helper';
import { PaginationResponseDto } from '~/helpers/pagination/pagination-response.dto';
import { RoleRepository } from './model/role.repository';
import { ILike } from 'typeorm';
import {
  BadRequestCustomException,
  ConflictCustomException,
} from '~/common/http';
import { ResponseDto } from '~/common/dtos';
import { ResponseService } from '~/shared/response/response.service';
import { RoleDto } from './dtos/role.dto';
import { isTrueOrFalse } from '~/utils/boolean.util';
import { RoleEntity } from './model/role.entity';

@Injectable()
export class RolesService {
  constructor(
    private roleRepository: RoleRepository,
    private responseService: ResponseService,
  ) {}

  /**
   * List of roles
   * @param pagination
   * @returns {ResponseDto<PaginationResponseDto<RoleResponseDto>>}
   */
  public async getRoles(
    pagination: PaginationRequest,
  ): Promise<ResponseDto<PaginationResponseDto<RoleDto>>> {
    try {
      const search = pagination.params?.search ?? '';

      const roles = await handlePaginate(this.roleRepository, pagination, {
        order: pagination.order,
        where: [
          {
            name: ILike(`%${search}%`),
          },
        ],
      });

      roles.items = await Promise.all(
        roles.items.map((role: RoleEntity) => RoleMapper.toDto(role)),
      );

      return this.responseService.makeResponse({
        message: 'Roles retrieved successfully',
        payload: roles,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Get role by id
   * @param id {number}
   * @returns {Promise<ResponseDto<RoleResponseDto>>}
   */
  public async getRoleById(id: string): Promise<ResponseDto<RoleResponseDto>> {
    const roleEntity = await this.roleRepository.findOneBy({ id });
    if (!roleEntity) {
      throw new NotFoundException();
    }
    const role = await RoleMapper.toDto(roleEntity);
    return this.responseService.makeResponse({
      message: 'Retrieved role by id',
      payload: { role },
    });
  }

  /**
   * Create new role
   * @param roleDto {CreateRoleRequestDto}
   * @returns {Promise<RoleResponseDto>}
   */
  public async createRole(
    roleDto: CreateRoleRequestDto,
  ): Promise<ResponseDto<RoleResponseDto>> {
    try {
      let roleEntity = RoleMapper.toCreateEntity(roleDto);
      roleEntity = await this.roleRepository.save(roleEntity);
      const role = await RoleMapper.toDto(roleEntity);
      return this.responseService.makeResponse({
        message: 'Role created successfully',
        payload: {
          role,
        },
      });
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('Role Already Exist');
      }
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new BadRequestCustomException('Foreign Key Constraint');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Update role by id
   * @param id {number}
   * @param roleDto {UpdateRoleRequestDto}
   * @returns {Promise<RoleResponseDto>}
   */
  public async updateRole(
    id: string,
    roleDto: UpdateRoleRequestDto,
  ): Promise<ResponseDto<RoleResponseDto>> {
    let roleEntity = await this.roleRepository.findOneBy({ id });
    if (!roleEntity) {
      throw new NotFoundException();
    }
    try {
      roleEntity = RoleMapper.toUpdateEntity(roleEntity, roleDto);
      await this.roleRepository.save(roleEntity);
      const updatedRoleEntity = await this.roleRepository.findOneBy({ id });
      const role = await RoleMapper.toDto(updatedRoleEntity);
      return this.responseService.makeResponse({
        message: 'Role updated successfully',
        payload: { role },
      });
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('Role Already Exist');
      }
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new BadRequestCustomException('Foreign Key Constraint');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
