import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
import {
  EventByCreatorIDAndEventId,
  EventDetailResponseDTO,
  EventDTO,
  EventListDTO,
  EventListResponseDTO,
} from '@dtos/event.dto';
import { EventService } from '@services/event.service';
import { SuccessResponseDTO } from '@dtos/response.dto';
import { TransactionInterceptor } from '@utils/transaction.interceptor';
import dataSource from '@configs/dataSource.config';
import { EventCategory } from '@constants/enum';
import { FollowUserService } from '@services/followUser.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('Event')
@ApiBearerAuth('access-token')
@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService,
    private followUserService: FollowUserService,
    private configService: ConfigService,
  ) {}
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
    await this.eventService.create(body, req.user.email);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Event Created Successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get List Of Event' })
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

  @Get('detail')
  @ApiOperation({
    summary: 'Retrieve event details by event ID and creator ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve event details by event ID and creator ID',
    type: EventDetailResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description:
      'User needs to follow the creator profile to view event details',
  })
  async getEventDetailByID(
    @Query() body: EventByCreatorIDAndEventId,
    @Req() req,
  ) {
    console.log('kkkk');
    const verify = await this.followUserService.isFollowed(
      req.user.sub,
      body.creator,
    );
    console.log(verify, 'sdfghjkl');
    if (!verify) {
      throw new HttpException(
        'You have to first follow creator profile to see detail of event',
        HttpStatus.BAD_REQUEST,
      );
    }
    const event = await this.eventService.getEventById(body.event);
    event.eventMedia.map((element) => {
      element.path = `localhost:${this.configService.get('PORT')}/${
        req.user.email.split('@')[0]
      }/event/${element.path}`;
      return element;
    });
    console.log(event, 'cc');
    return event;
  }
}
