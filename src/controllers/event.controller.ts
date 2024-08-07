import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventDTO } from '@dtos/event.dto';
import { EventService } from '@services/event.service';
import { SuccessResponseDTO } from '@dtos/response.dto';

@ApiTags('Event')
@ApiBearerAuth('access-token')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Post('/')
  @ApiBody({
    description: 'Event data to create a new event',
    type: EventDTO,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The event has been successfully created.',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async create(@Body() body: EventDTO, @Req() req):Promise<SuccessResponseDTO> {
    body.creator=req.user.sub
    const data = await this.eventService.create(body)
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Event Created Successfully',   
    }
  }
}


