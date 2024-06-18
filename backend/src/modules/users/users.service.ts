import {
  InternalServerErrorException,
  RequestTimeoutException,
  Injectable,
  BadRequestException,
  NotFoundException,
  Scope,
  Inject,
} from '@nestjs/common';
import {
  ChangePasswordRequestDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dtos';
import { PaginationRequest } from '~/helpers/pagination';
import { DBErrorCode } from '~/common/enums';
import { UserMapper } from './users.mapper';
import { HashHelper } from '~/helpers';
import { TimeoutError } from 'rxjs';
import { ILike } from 'typeorm';
import { PaginationResponseDto } from '~/helpers/pagination/pagination-response.dto';
import { handlePaginate } from '~/helpers/pagination/pagination.helper';
import { RequestResetPasswordDTO } from './dtos/request-reset-password.dto';
import { VerifyPasswordResetOtpDTO } from './dtos/verify-reset-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { OTPService } from '../otp/otp.service';
import { EReason } from '../otp/enums/otp.reason';
import { MailerService } from '~/shared/mailer/mailer.service';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import {
  BadRequestCustomException,
  ConflictCustomException,
  InternalServerErrorCustomException,
  NotFoundCustomException,
} from '~/common/http';
import { UserRepository } from './model/user.repository';
import { ResponseDto } from '~/common/dtos';
import { ResponseService } from '~/shared/response/response.service';
import { VerifyResetPasswordResponseDto } from './dtos/verify-reset-password-response.dto';
import { UserDto } from './dtos/user.dto';
import { RemoveRolesFromUserRequestDto } from './dtos/remove-roles-request.dto';
import { AddRolesToUserRequestDto } from './dtos/add-roles-request.dto';
import { UserRequest } from '~/types/request';
import { REQUEST } from '@nestjs/core';
import { isTrueOrFalse } from '~/utils/boolean.util';
import { UserEntity } from './model/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @Inject(REQUEST) private req: UserRequest,
    private otpService: OTPService,
    private resetPasswordService: ResetPasswordService,
    private mailService: MailerService,
    private userRepository: UserRepository,
    private responseService: ResponseService,
  ) {}

  /**
   * Get a paginated user list
   * @param pagination {PaginationRequest}
   * @returns {Promise<PaginationResponseDto<UserResponseDto>>}
   */
  public async getUsers(
    pagination: PaginationRequest,
  ): Promise<ResponseDto<PaginationResponseDto<UserDto>>> {
    try {
      const search = pagination.params?.search ?? '';
      const roles = isTrueOrFalse(pagination.params?.roles);

      const users = await handlePaginate(this.userRepository, pagination, {
        order: pagination.order,
        where: [
          {
            username: ILike(`%${search}%`),
          },
          {
            firstName: ILike(`%${search}%`),
          },
          {
            lastName: ILike(`%${search}%`),
          },
        ],
      });

      users.items = await Promise.all(
        users.items.map((item: UserEntity) =>
          UserMapper.toDto(item, { roles }),
        ),
      );

      return this.responseService.makeResponse({
        message: 'Users retrieved successfully',
        payload: users,
      });
    } catch (error) {
      if (error instanceof NotFoundCustomException) {
        throw new NotFoundCustomException('Not found');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Get user by id
   * @param id {string}
   * @returns {ResponseDto<UserResponseDto>}
   */
  public async getUserById(
    id: string,
    params: { roles?: string },
  ): Promise<ResponseDto<UserResponseDto>> {
    const roles = isTrueOrFalse(params?.roles);
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundCustomException('Not found');
    }

    return this.responseService.makeResponse({
      message: 'User found by id',
      payload: {
        user: await UserMapper.toDto(userEntity, { roles }),
      },
    });
  }

  /**
   * Create new user
   * @param userDto {CreateUserRequestDto}
   * @returns {ResponseDto<UserResponseDto>}
   */
  public async createUser(
    userDto: CreateUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    try {
      let userEntity = UserMapper.toCreateEntity(userDto);
      userEntity = await this.userRepository.save(userEntity);
      const user = await UserMapper.toDto(userEntity);
      return this.responseService.makeResponse({
        message: 'User created successfully',
        payload: { user },
      });
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('User already exists');
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
   * Update User by id
   * @param id {string}
   * @param userDto {UpdateUserRequestDto}
   * @returns {ResponseDto<UserResponseDto>}
   */
  public async updateUser(
    id: string,
    userDto: UpdateUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    let userEntity = await this.userRepository.findOne({ where: { id } });
    if (!userEntity) {
      throw new NotFoundCustomException('Not found');
    }

    try {
      userEntity = UserMapper.toUpdateEntity(userEntity, userDto);
      userEntity = await this.userRepository.save(userEntity);
      const user = await UserMapper.toDto(userEntity);

      return this.responseService.makeResponse({
        message: 'User updated successfully',
        payload: { user },
      });
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('User already exists');
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
   * Update User by id
   * @param userDto {UpdateUserRequestDto}
   * @returns {ResponseDto<UserResponseDto>}
   */
  public async updateProfile(
    user: UserEntity,
    userDto: UpdateUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    let userEntity = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userEntity) {
      throw new NotFoundCustomException('Not found');
    }

    try {
      userEntity = UserMapper.toUpdateEntity(userEntity, userDto);
      userEntity = await this.userRepository.save(userEntity);
      const user = await UserMapper.toDto(userEntity);

      return this.responseService.makeResponse({
        message: 'User updated successfully',
        payload: { user },
      });
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('User already exists');
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
   * Change user password
   * @param changePassword {ChangePasswordRequestDto}
   * @param user {string}
   * @returns {ResponseDto<UserResponseDto>}
   */
  public async changePassword(
    changePassword: ChangePasswordRequestDto,
    userId: string,
  ): Promise<ResponseDto<UserResponseDto>> {
    const { currentPassword, newPassword } = changePassword;

    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userEntity) {
      throw new NotFoundCustomException('Not found');
    }

    const passwordMatch = await HashHelper.compare(
      currentPassword,
      userEntity.password,
    );

    if (!passwordMatch) {
      throw new BadRequestCustomException('Invalid password');
    }

    try {
      userEntity.password = await HashHelper.encrypt(newPassword);
      await this.userRepository.save(userEntity);
      const user = await UserMapper.toDto(userEntity);
      return this.responseService.makeResponse({
        message: 'Password changed successfully',
        payload: { user },
      });
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async requestResetPassword(
    dto: RequestResetPasswordDTO,
  ): Promise<ResponseDto<null>> {
    try {
      const validity = 30;

      const otp = this.otpService.generateOTP();

      const reason: EReason = EReason.RESET_PASSWORD;

      const user = await this.userRepository.findOneBy({
        email: dto.email,
      });

      if (!user) throw new NotFoundCustomException('Not found');

      await this.otpService.createOTP({
        otp,
        validity,
        reason,
        user,
      });

      await this.mailService.sendEMail({
        body: `Your OTP is ${otp}. It will expire in ${validity} minutes.`,
        subject: 'Password Reset OTP',
        to: dto.email,
      });

      return this.responseService.makeResponse({
        message: 'OTP was sent to your email!',
        payload: null,
      });
    } catch (error) {
      throw new InternalServerErrorCustomException('Interal Server Error');
    }
  }

  async verifyResetPassword(
    verifyResetPasswordDTO: VerifyPasswordResetOtpDTO,
  ): Promise<ResponseDto<VerifyResetPasswordResponseDto>> {
    const { otp, email } = verifyResetPasswordDTO;

    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundCustomException('Not found');

    const otpData = await this.otpService.findOTP({
      user,
      otp,
    });

    if (otpData === 'not-found') throw new NotFoundCustomException('Not found');

    if (otpData === 'expired')
      throw new BadRequestCustomException('OTP expired');

    if (otpData === 'inactive')
      throw new BadRequestCustomException('Inactive OTP');

    const resetToken =
      await this.resetPasswordService.createAndSaveResetPasswordToken(user);

    return this.responseService.makeResponse({
      message: 'Use this reset token',
      payload: { resetToken },
    });
  }

  async resetPassword(
    resetPasswordDTO: ResetPasswordDTO,
  ): Promise<ResponseDto<null>> {
    try {
      const { newPassword, resetToken } = resetPasswordDTO;

      const userId = await this.resetPasswordService.findUserId(resetToken);

      if (!userId) throw new BadRequestException('Session expired');

      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) throw new NotFoundCustomException('Not found');

      const doesPasswordExist = await user.validatePassword(newPassword);

      if (doesPasswordExist)
        throw new BadRequestCustomException(
          'Password cannot be the same as the old one',
        );

      const hashed_password = await HashHelper.encrypt(newPassword);

      await this.userRepository.update(
        { id: userId },
        {
          password: hashed_password,
        },
      );

      return this.responseService.makeResponse({
        message: 'Password reset successfully',
        payload: null,
      });
    } catch (error) {
      throw new InternalServerErrorCustomException(error.message);
    }
  }

  /**
   * Add roles to user by []ids
   * @param id {string}
   * @body addRoles {AddRolesDto}
   * @returns {Promise<UserResponseDto>}
   */
  public async addRoles(
    id: string,
    addRolesDto: AddRolesToUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    let userEntity = await this.userRepository.findOneBy({ id });
    if (!userEntity) throw new NotFoundException();
    try {
      await UserMapper.addRoles(userEntity, addRolesDto.roles);
      const updatedUserEntity = await this.userRepository.findOneBy({ id });
      const user = await UserMapper.toDto(updatedUserEntity, {
        roles: true,
      });
      return this.responseService.makeResponse({
        message: 'User updated successfully',
        payload: { user },
      });
    } catch (error) {
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new BadRequestCustomException('Foreign Key Constraint');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorCustomException();
      }
    }
  }

  /**
   * Remove roles to role by []ids
   * @param id {string}
   * @body addRolesDto {AddRolesDto}
   * @returns {Promise<UserResponseDto>}
   */
  public async removeRoles(
    id: string,
    removeRoles: RemoveRolesFromUserRequestDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    const userEntity = await this.userRepository.findOneBy({ id });
    if (!userEntity) throw new NotFoundException();
    try {
      await UserMapper.removeRoles(userEntity, removeRoles.roles);
      const updatedUserEntity = await this.userRepository.findOneBy({ id });
      const user = await UserMapper.toDto(updatedUserEntity, {
        roles: true,
      });
      return this.responseService.makeResponse({
        message: 'User updated successfully',
        payload: { user },
      });
    } catch (error) {
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new BadRequestCustomException('Foreign Key Constraint');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
      }
    }
  }

  async getProfile(): Promise<ResponseDto<UserResponseDto>> {
    const userEntity = await this.userRepository.findOneBy({
      id: this.req.user.id,
    });
    if (!userEntity) throw new NotFoundException();
    return this.responseService.makeResponse({
      message: 'Profile found',
      payload: {
        user: await UserMapper.toDto(userEntity, {
          roles: true,
        }),
      },
    });
  }
}
