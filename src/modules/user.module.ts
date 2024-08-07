import { UserController } from "@controllers/user.controller";
import { FollowUserEntity } from "@entities/followUser.entity";
import { AuthenticationMiddleware } from "@middlewares/authentication.middleware";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowUserService } from "@services/followUser.service";

@Module({
    imports:[TypeOrmModule.forFeature([FollowUserEntity])],
    controllers:[UserController],
    providers:[FollowUserService]
})
export class UserModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthenticationMiddleware)
          .forRoutes({ path: 'user/follow', method: RequestMethod.POST },{ path: 'user/unfollow', method: RequestMethod.POST });
      }
}