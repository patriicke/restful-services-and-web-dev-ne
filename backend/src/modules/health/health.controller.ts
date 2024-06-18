import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiInternalServerErrorCustomResponse } from '~/common/decorators/api-ise-custom-response.decorator';
import { ApiOkCustomResponse } from '~/common/decorators/api-ok-custom-response.decorator';
import { HealthService } from './health.service';
import { ResponseDto } from '~/common/dtos';
import { NullDto } from '~/common/dtos/null.dto';
import { Public } from '../auth/decorators';

@ApiTags('Health')
@Controller({ path: 'health', version: '1' })
@ApiInternalServerErrorCustomResponse(NullDto)
@Public()
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @ApiOperation({ description: 'Health Test' })
  @ApiOkCustomResponse(NullDto)
  @HttpCode(HttpStatus.OK)
  getHealth(): ResponseDto<null> {
    return this.healthService.getHealth();
  }
}
