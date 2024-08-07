import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventController } from "@controllers/event.controller";
import { EventEntity } from "@entities/event.entity";
import { EventService } from "@services/event.service";
import { EventMediaEntity } from "@entities/eventMedia.entity";

@Module({
    imports:[TypeOrmModule.forFeature([EventEntity,EventMediaEntity])],
    controllers:[EventController],
    providers:[EventService]

})
export class EventModule{}