import {
  ValidationPipe,
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthCredentialsRequestDto, LoginResponseDto } from './dtos';
import { AuthService } from './auth.service';
import { AuthRegisterRequestDto } from './dtos/auth-register.dto';
import { LogoutRequestDto } from './dtos/logout.dto';
import {
  ApiCreatedCustomResponse,
  ApiOkCustomResponse,
  Ip,
} from '~/common/decorators';
import { TOKEN_NAME } from '~/constants';
import { ApiBadRequestCustomResponse } from '~/common/decorators/api-bad-request-custom-response.decorator';
import { ApiInternalServerErrorCustomResponse } from '~/common/decorators/api-ise-custom-response.decorator';
import { NullDto } from '~/common/dtos/null.dto';
import { ResponseDto } from '~/common/dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RefreshTokenRequestDto } from '../tokens/dto/refresh-token-request.dto';
import { TokenResponseDto } from '../tokens/dto/token-response.dto';
import { Public } from './decorators';

@Public()
@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
@ApiBadRequestCustomResponse(NullDto)
@ApiInternalServerErrorCustomResponse(NullDto)
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedCustomResponse(LoginResponseDto)
  @Post('/register')
  register(
    @Body(ValidationPipe) authRegisterDto: AuthRegisterRequestDto,
    @Ip() ip: string,
  ): Promise<ResponseDto<LoginResponseDto>> {
    return this.authService.register(authRegisterDto);
  }

  @ApiOkCustomResponse(LoginResponseDto)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsRequestDto,
  ): Promise<ResponseDto<LoginResponseDto>> {
    return this.authService.login(authCredentialsDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkCustomResponse(NullDto)
  @Post('/logout')
  logout(
    @Body(ValidationPipe) logoutRequestDto: LogoutRequestDto,
  ): Promise<ResponseDto<null>> {
    return this.authService.logout(logoutRequestDto);
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOkCustomResponse(TokenResponseDto)
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<ResponseDto<TokenResponseDto>> {
    return this.authService.refreshAccessToken(refreshTokenDto);
  }

  @ApiBearerAuth(TOKEN_NAME)
  @ApiOkCustomResponse(NullDto)
  @HttpCode(HttpStatus.OK)
  @Post('/logout/all')
  logoutAll(): Promise<ResponseDto<null>> {
    return this.authService.logoutAll();
  }
}
