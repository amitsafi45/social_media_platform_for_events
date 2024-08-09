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
    const getEvent = await event.manager.getRepository(EventEntity).findOne({
      where: {
        id: event.entity.event.toString(),
      },
      relations: {
        creator: true,
        comments: true,
      },
    });
    if (getEvent) {
      const notification = {
        sender: event.entity.commentator,
        receiver: getEvent.creator,
        title: 'New Comment on Your Event!',
        content: `Hello! someone has just commented on your event titled "${getEvent.title.substring(
          0,
          20,
        )}+ '....`,
        contentId: getEvent.id,
      };
      await event.manager
        .getRepository(NotificationEntity)
        .insert(notification);
    }
    return event.manager;
  }
}
