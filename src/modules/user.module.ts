import { UserController } from "@controllers/user.controller";
import { CommentEntity } from "@entities/comment.entity";
import { FollowUserEntity } from "@entities/followUser.entity";
import { AuthenticationMiddleware } from "@middlewares/authentication.middleware";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentService } from "@services/comment.service";
import { FollowUserService } from "@services/followUser.service";

@Module({
    imports:[TypeOrmModule.forFeature([FollowUserEntity,CommentEntity])],
    controllers:[UserController],
    providers:[FollowUserService,CommentService]
})
export class UserModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthenticationMiddleware)
          .forRoutes({ path: 'user/follow', method: RequestMethod.POST },{ path: 'user/unfollow', method: RequestMethod.POST},
            { path: 'user/comment', method: RequestMethod.POST});
      }
}