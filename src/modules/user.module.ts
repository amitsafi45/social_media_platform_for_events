import { UserController } from '@controllers/user.controller';
import { CommentEntity } from '@entities/comment.entity';
import { FollowUserEntity } from '@entities/followUser.entity';
import { EventLikeEntity } from '@entities/eventLike.entity';
import { AuthenticationMiddleware } from '@middlewares/authentication.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '@services/comment.service';
import { FollowUserService } from '@services/followUser.service';
import { EventLikeService } from '@services/eventLike.service';
import { UserService } from '@services/user.service';
import { UserEntity } from '@entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FollowUserEntity,
      CommentEntity,
      EventLikeEntity,
      UserEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [FollowUserService, CommentService, EventLikeService, UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'user/follow', method: RequestMethod.POST },
        { path: 'user/unfollow', method: RequestMethod.DELETE },
        { path: 'user/comment', method: RequestMethod.POST },
        { path: 'user/like', method: RequestMethod.POST },
        { path: 'user/', method: RequestMethod.GET },
      );
  }
}
