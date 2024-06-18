import { Reflector } from '@nestjs/core';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { IS_PUBLIC } from '~/constants';
import { UnauthorizedCustomException } from '~/common/http/exceptions/unauthorized.exception';
import { TokensService } from '~/modules/tokens/tokens.service';
import { InternalServerErrorCustomException } from '~/common/http';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private tokenService: TokensService,
    private reflector: Reflector,
  ) {
    super();
  }

  /**
   * Verify the token is valid
   * @param context {ExecutionContext}
   * @returns super.canActivate(context)
   */
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(
        context.switchToHttp().getRequest(),
      );

      if (!accessToken) throw new UnauthorizedCustomException('Not logged in!');

      await this.tokenService.verifyAccessToken(accessToken);

      return super.canActivate(context);
    } catch (error) {
      if (error.name !== 'Error') throw error;
      throw new InternalServerErrorCustomException();
    }
  }

  /**
   * Handle request and verify if exist an error or there's not user
   * @param error
   * @param user
   * @returns user || error
   */
  handleRequest(error, user) {
    if (error || !user) throw new UnauthorizedCustomException();
    return user;
  }
}
