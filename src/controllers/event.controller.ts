import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventDTO, EventListDTO, EventListResponseDTO } from '@dtos/event.dto';
import { EventService } from '@services/event.service';
import { SuccessResponseDTO } from '@dtos/response.dto';
import { TransactionInterceptor } from '@utils/transaction.interceptor';
import dataSource from '@configs/dataSource.config';
import { EventCategory } from '@constants/enum';
import { EventEntity } from '@entities/event.entity';

@ApiTags('Event')
@ApiBearerAuth('access-token')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Post('/')
  @ApiOperation({ summary: 'create a new Event' })
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
  @UseInterceptors(new TransactionInterceptor(dataSource))
  async create(
    @Body() body: EventDTO,
    @Req() req,
  ): Promise<SuccessResponseDTO> {
    body.creator = req.user.sub;
    await this.eventService.create(body,req.user.email);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Event Created Successfully',
    };
  }

  @Get()
  @ApiQuery({ name: 'category', enum: EventCategory, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiResponse({
    status: 201,
    description: 'Event List',
    type: EventListResponseDTO,
  })
  async eventList(
    @Req() req: any,
    @Query('category') category: EventCategory,
    @Query('search') search: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ): Promise<EventListResponseDTO> {
    const { data, ...pagination } = await this.eventService.eventList(
      req.user.sub,
      category || EventCategory.None,
      search,
      limit,
      page,
    );

    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Event Fetch Successfully',
      data: data as EventListDTO[],
      ...pagination,
    };
  }
}
