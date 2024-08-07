import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from 'src/services/event.service';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private eventService:EventService) {}
}
