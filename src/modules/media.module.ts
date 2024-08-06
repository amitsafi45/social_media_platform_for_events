import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MediaController } from 'src/controllers/media.controller';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { FileManagementService } from 'src/services/fileManagement.service';

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
