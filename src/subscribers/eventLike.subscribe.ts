import { EventEntity } from '@entities/event.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { NotificationEntity } from '@entities/notification.entity';
import { EventLikeEntity } from '@entities/eventLike.entity';

@EventSubscriber()
export class EventLikeEntitySubscriber
  implements EntitySubscriberInterface<EventLikeEntity>
{
  listenTo() {
    return EventLikeEntity;
  }

  async afterInsert(event: InsertEvent<EventLikeEntity>) {
    const getEvent = await event.manager.getRepository(EventEntity).findOne({
      where: {
        id: ((event.entity.event).toString()),
      },
      relations:{
        creator:true,
        comments:true
      }
    }); 
    if(getEvent){

      const notification = {
        sender: event.entity.user,
        receiver: getEvent.creator,
        title: 'New Liked on Your Event!',
        content: `Hello! someone has just Liked on your event titled "${getEvent.title.substring(0, 20) }+ '....`,
        contentId: getEvent.id,
      };
      await event.manager.getRepository(NotificationEntity).insert(notification);
    }
    return event.manager
    
    
  }
  
}
