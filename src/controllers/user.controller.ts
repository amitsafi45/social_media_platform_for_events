import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FollowUserService } from '@services/followUser.service'; 
import { SuccessResponseDTO } from '@dtos/response.dto';
import { FollowUserDTO, LikeDTO } from '@dtos/user.dto';
import { CommentDTO } from '@dtos/event.dto';
import { CommentService } from '@services/comment.service';
import { EventLikeService } from '@services/eventLike.service';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly followService: FollowUserService,
    private readonly commentService : CommentService,
    private readonly likeService:EventLikeService
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
    @Req() req
  ): Promise<SuccessResponseDTO> {
    body.followedBy = req.user.sub;
    await this.followService.follow(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Follow User Successfully',
    };
  }





  @Post('/unfollow')
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
    @Req() req
  ): Promise<SuccessResponseDTO> {
    body.followedBy = req.user.sub;
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
  async commentOnEvent(@Body()body:CommentDTO,@Req()req):Promise<SuccessResponseDTO>{
    body.commentator=req.user.sub
   const data =await this.commentService.create(body)
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
  async likeEvent(@Body()body:LikeDTO,@Req()req):Promise<SuccessResponseDTO>{
    body.user=req.user.sub
   const data =await this.likeService.create(body)
   return {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Event Liked Successfully',
  };
  }
}
