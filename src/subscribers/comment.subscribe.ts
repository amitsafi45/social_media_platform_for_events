import { EventEntity } from '@entities/event.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { NotificationEntity } from '@entities/notification.entity';
import { FollowUserEntity } from '@entities/followUser.entity';
import { CreateNotificationDTO } from '@dtos/notification.dto';
import { CommentEntity } from '@entities/comment.entity';

@EventSubscriber()
export class CommentEntitySubscriber
  implements EntitySubscriberInterface<CommentEntity>
{
  listenTo() {
    return CommentEntity;
  }

  async afterInsert(event: InsertEvent<CommentEntity>) {
     
}
}