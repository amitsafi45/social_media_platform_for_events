import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventDTO } from '@dtos/event.dto';
import { EventService } from '@services/event.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Post('/')
  async create(@Body() body: EventDTO, @Req() req) {
    return body;
  }
}
