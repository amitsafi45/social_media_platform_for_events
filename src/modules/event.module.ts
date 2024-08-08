import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "@controllers/event.controller";
import { EventEntity } from "@entities/event.entity";
import { EventService } from "@services/event.service";
import { EventMediaEntity } from "@entities/eventMedia.entity";
import { EventTransactionRepository } from "@repository/event.repository";
import { AuthenticationMiddleware } from "@middlewares/authentication.middleware";
import { EventEntitySubscriber } from "subscribers/event.subscribe";
import { NotificationEntity } from "@entities/notification.entity";

@Module({
    imports:[TypeOrmModule.forFeature([EventEntity,EventMediaEntity,NotificationEntity])],
    controllers:[EventController],
    providers:[EventService,EventTransactionRepository,EventEntitySubscriber
    ]

})
 export class EventModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthenticationMiddleware)
          .forRoutes({ path: 'event', method: RequestMethod.POST });
      }
}