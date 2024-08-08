import { EventEntity } from '@entities/event.entity';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { NotificationEntity } from '@entities/notification.entity';
import { FollowUserEntity } from '@entities/followUser.entity';
import { CreateNotificationDTO } from '@dtos/notification.dto';
import { UserEntity } from '@entities/user.entity';

@EventSubscriber()
export class EventEntitySubscriber implements EntitySubscriberInterface<EventEntity> {

  listenTo() {
    return EventEntity;
  }

  async afterInsert(event: InsertEvent<EventEntity>) {

    // Retrieve the followers of the event creator
    const getFollowers = await event.manager.getRepository(FollowUserEntity)
      .createQueryBuilder('follow')
      .leftJoinAndSelect("follow.followUser", "follower")
      .where('follow.followed_by_id = :creatorId', { creatorId: event.entity.creator })
      .getMany();


    // Check if there are any followers and create notifications for each
    if (getFollowers.length > 0) {
      const notifications = getFollowers.map(follower => ({
        sender: event.entity.creator,
        receiver: (follower.followUser as UserEntity).id,
        title: 'New Event Alert!',
        content: `Check out the new event "${event.entity.title}" happening at ${event.entity.location} on ${event.entity.date}. Don't miss it!`,
        contentId: event.entity.id,
      })) as CreateNotificationDTO[];

      // Insert notifications into the database
      await event.manager.getRepository(NotificationEntity).insert(notifications);

    
    } else {
      console.log("No followers found for the event creator.");
    }
   return event.manager
  }
}
