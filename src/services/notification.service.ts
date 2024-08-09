import { NotificationEntity } from "@entities/notification.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class NotificationService{
    constructor(
        @InjectRepository(NotificationEntity)
        private readonly notificationRepo:Repository<NotificationEntity>
    ){}

    async getNotificationByReceiverId(receiver:string){
      const data=await this.notificationRepo.find({
        where:{
            receiver:{
                id:receiver
            }
        }
      })
      return data
    }
}