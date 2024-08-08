import { EventEntity } from '@entities/event.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { NotificationEntity } from '@entities/notification.entity';
import { FollowUserEntity } from '@entities/followUser.entity';
import { CreateNotificationDTO } from '@dtos/notification.dto';
import { UserEntity } from '@entities/user.entity';

@EventSubscriber()
export class EventEntitySubscriber
  implements EntitySubscriberInterface<EventEntity>
{
  listenTo() {
    return EventEntity;
  }

  async afterInsert(event: InsertEvent<EventEntity>) {
    const getFollowers=await event.manager.getRepository(FollowUserEntity).find({
      where:{
        followerUser:{
          id:event.entity.creator as string
        }       
      },
      relations:{
        followingUser:true}
    })
    getFollowers.toString()
    console.log(event.entity.creator as string)
    console.log(getFollowers,'getFollowers')
    // [
    //   FollowUserEntity {
    //     id: 'f3cdedce-63a1-4504-8753-8e31168bbb45',
    //     createdAt: 2024-08-08T16:31:30.162Z,
    //     followingUser: UserEntity {
    //       id: 'bfa4a457-8d9a-474b-bc58-e17482121851',
    //       name: 'John Doe',
    //       email: 'john.doe1we1221@example.com'
    //     }
    //   }
    // ] getFollowers

    // Check if there are any followers and create notifications for each
    if (getFollowers.length > 0) {
      const notifications = getFollowers.map((follower) => ({
        sender: event.entity.creator,
        receiver: follower.followingUser,
        title: 'New Event Alert!',
        content: `Check out the new event "${event.entity.title}" happening at ${event.entity.location} on ${event.entity.date}. Don't miss it!`,
        contentId: event.entity.id,
      })) as CreateNotificationDTO[];

      // Insert notifications into the database
      await event.manager
        .getRepository(NotificationEntity)
        .insert(notifications);
    } else {
      console.log('No followers found for the event creator.');
    }
    return event.manager;
  }
}
