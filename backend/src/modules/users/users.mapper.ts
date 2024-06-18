import { RoleEntity } from '../roles/model/role.entity';
import { RoleMapper } from '../roles/role.mapper';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dtos';
import { UserDto } from './dtos/user.dto';
import { UserStatus } from './enums/user-status.enum';
import { UserEntity } from './model/user.entity';

type DtoPopulation = {
  roles?: boolean;
};

export class UserMapper {
  public static async toDto(
    entity: UserEntity,
    population: DtoPopulation = { roles: false },
  ): Promise<UserDto> {
    const { roles } = population;
    const dto = new UserDto();
    dto.id = entity.id;
    dto.username = entity.username;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.status = entity.status;

    if (roles)
      dto.roles = await Promise.all(
        (await entity.roles).map((role) => RoleMapper.toDto(role)),
      );

    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  public static toCreateEntity(dto: CreateUserRequestDto): UserEntity {
    const entity = new UserEntity();
    entity.username = dto.username;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.password = dto.password;
    entity.roles = Promise.resolve(
      dto.roles.map((id) => new RoleEntity({ id })),
    );
    entity.status = UserStatus.Active;
    return entity;
  }

  public static toUpdateEntity(
    entity: UserEntity,
    dto: UpdateUserRequestDto,
  ): UserEntity {
    for (const key in dto) {
      if (dto[key] !== undefined) {
        entity[key] = dto[key];
      }
    }
    if (dto.roles)
      entity.roles = Promise.resolve(
        dto.roles.map((id) => new RoleEntity({ id })),
      );
    return entity;
  }

  public static async addRoles(
    entity: UserEntity,
    roleIds: string[],
  ): Promise<UserEntity> {
    const userEntityWithRelations = await UserMapper.toDto(entity, {
      roles: true,
    });
    const currentRoles = userEntityWithRelations.roles.map((role) => role.id);
    const mergedRoles = Array.from(new Set(currentRoles.concat(roleIds)));
    entity.roles = Promise.resolve(
      mergedRoles.map((id) => new RoleEntity({ id })),
    );
    await entity.save();
    return entity;
  }

  public static async removeRoles(
    entity: UserEntity,
    roleIds: string[],
  ): Promise<UserEntity> {
    const userEntityWithRelations = await UserMapper.toDto(entity, {
      roles: true,
    });
    const currentRoles = userEntityWithRelations.roles.map((role) => role.id);
    const filteredRoles = currentRoles.filter(
      (role) => !roleIds.includes(role),
    );
    entity.roles = Promise.resolve(
      filteredRoles.map((id) => new RoleEntity({ id })),
    );
    await entity.save();
    return entity;
  }
}
