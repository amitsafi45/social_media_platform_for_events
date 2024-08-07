import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MediaController } from '@controllers/media.controller';
import { AuthenticationMiddleware } from '@middlewares/authentication.middleware';
import { FileManagementService } from '@services/fileManagement.service';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [FileManagementService],
  exports: [],
})
export class MediaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'media/upload', method: RequestMethod.POST });
  }
}
