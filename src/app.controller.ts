import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ping')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  ping(): string {
    return this.appService.ping();
  }
}
