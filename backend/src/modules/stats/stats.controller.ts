import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ResponseDto } from '~/common/dtos';
import { StatDto } from './dto/stat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators';
import { TOKEN_NAME } from '~/constants';
import { ApiInternalServerErrorCustomResponse } from '~/common/decorators/api-ise-custom-response.decorator';
import { NullDto } from '~/common/dtos/null.dto';
import { ApiBadRequestCustomResponse } from '~/common/decorators/api-bad-request-custom-response.decorator';
import { ApiUnauthorizedCustomResponse } from '~/common/decorators/api-unauthorized-custom-response.decorator';
import { ApiForbiddenCustomResponse } from '~/common/decorators/api-forbidden-custom-response.decorator';

@ApiTags('Stats')
@Roles('admin')
@ApiBearerAuth(TOKEN_NAME)
@ApiInternalServerErrorCustomResponse(NullDto)
@ApiBadRequestCustomResponse(NullDto)
@ApiUnauthorizedCustomResponse(NullDto)
@ApiForbiddenCustomResponse(NullDto)
@Controller({
  path: 'stats',
  version: '1',
})
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get()
  getStats(): Promise<ResponseDto<StatDto>> {
    return this.statsService.getStats();
  }
}
