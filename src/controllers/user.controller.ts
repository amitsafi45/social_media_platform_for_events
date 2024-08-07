import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FollowUserService } from '@services/followUser.service'; 
import { SuccessResponseDTO } from '@dtos/response.dto';
import { FollowUserDTO } from '@dtos/user.dto';

@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly followService: FollowUserService) {}

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
}
