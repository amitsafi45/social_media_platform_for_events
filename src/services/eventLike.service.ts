import { LikeDTO } from "@dtos/user.dto";
import { EventLikeEntity } from "@entities/eventLike.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class EventLikeService{
    constructor(
        @InjectRepository(EventLikeEntity)
        private readonly eventLikeRepo:Repository<EventLikeEntity>
    ){}

   async create(data:LikeDTO){
     return await this.eventLikeRepo.insert(data)
   }
   
}