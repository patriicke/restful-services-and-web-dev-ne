import { CreateRoleRequestDto, UpdateRoleRequestDto } from './dtos';
import { RoleDto } from './dtos/role.dto';
import { RoleEntity } from './model/role.entity';

export class RoleMapper {
  public static async toDto(entity: RoleEntity): Promise<RoleDto> {
    const dto = new RoleDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.active = entity.active;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  public static toCreateEntity(dto: CreateRoleRequestDto): RoleEntity {
    const entity = new RoleEntity();
    entity.name = dto.name;
    entity.active = true;
    return entity;
  }

  public static toUpdateEntity(
    entity: RoleEntity,
    dto: UpdateRoleRequestDto,
  ): RoleEntity {
    entity.name = dto.name;
    entity.active = dto.active;
    return entity;
  }
}
