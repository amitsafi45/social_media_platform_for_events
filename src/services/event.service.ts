import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from "src/entities/event.entity";
import { EventMediaEntity } from "src/entities/eventMedia.entity";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventService{
    constructor(
        @InjectRepository(EventEntity)
        private eventRepo:Repository<EventEntity>,
        @InjectRepository(EventMediaEntity)
        private eventMediaRepo:Repository<EventMediaEntity>

    ){}
}