import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { FollowUserService } from '@services/followUser.service';
import { SuccessResponseDTO } from '@dtos/response.dto';
import {
  FollowUserDTO,
  LikeDTO,
  ProfileResponseDTO,
  UserProfileResponseDTO,
} from '@dtos/user.dto';
import { CommentDTO } from '@dtos/event.dto';
import { CommentService } from '@services/comment.service';
import { EventLikeService } from '@services/eventLike.service';
import { UserService } from '@services/user.service';
import { NotificationService } from '@services/notification.service';
import { CreateNotificationDTO, NotificationResponseDTO } from '@dtos/notification.dto';
import { NotificationEntity } from '@entities/notification.entity';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(
    private readonly followService: FollowUserService,
    private readonly commentService: CommentService,
    private readonly likeService: EventLikeService,
    private readonly userService: UserService,
    private readonly notificationService:NotificationService
  ) {}

  @Post('/follow')
  @ApiOperation({ summary: 'Follow a user' })
  @ApiBody({ type: FollowUserDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Follow User Successfully',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  async followUser(
    @Body() body: FollowUserDTO,
    @Req() req,
  ): Promise<SuccessResponseDTO> {
    body.followingUser = req.user.sub;
    await this.followService.follow(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Follow User Successfully',
    };
  }

  @Delete('/unfollow')
  @ApiOperation({ summary: 'unfollow a user' })
  @ApiBody({ type: FollowUserDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'unfollow User Successfully',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  async unfollowUser(
    @Body() body: FollowUserDTO,
    @Req() req,
  ): Promise<SuccessResponseDTO> {
    body.followingUser = req.user.sub;
    await this.followService.unfollow(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'unfollow User Successfully',
    };
  }

  @Post('/comment')
  @ApiOperation({ summary: 'Comment on an event' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  async commentOnEvent(
    @Body() body: CommentDTO,
    @Req() req,
  ): Promise<SuccessResponseDTO> {
    body.commentator = req.user.sub;
    const data = await this.commentService.create(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Comment create Successfully',
    };
  }

  @Post('/like')
  @ApiOperation({ summary: 'Like event' })
  @ApiResponse({
    status: 201,
    description: 'Event successfully Liked',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  async likeEvent(
    @Body() body: LikeDTO,
    @Req() req,
  ): Promise<SuccessResponseDTO> {
    body.user = req.user.sub;
    const data = await this.likeService.create(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Event Liked Successfully',
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get the user profile along with followers and following list',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Profile Fetch Successfully',
    type: ProfileResponseDTO,
  })
  async getProfile(@Req() req): Promise<ProfileResponseDTO> {
    const data = await this.userService.getProfile(req.user.sub);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Profile Fetch Successfully',
      data: data,
    } as ProfileResponseDTO;
  }

  @Get('notification')
  @ApiOperation({
    summary: ' Fetch Notification List ',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ' Fetch Notification List Successfully',
    type: ProfileResponseDTO,
  })
  async notificationList(@Req() req):Promise<NotificationResponseDTO>{
    const data=await this.notificationService.getNotificationByReceiverId(req.user.sub)
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: ' Fetch Notification Successfully',
      data: data as CreateNotificationDTO[],
    } ;
  }
}
