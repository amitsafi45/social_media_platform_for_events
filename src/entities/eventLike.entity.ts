import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '@entities/user.entity';
import { EventEntity } from '@entities/event.entity';

@Entity('event_like')
@Unique(['user', 'event'])
export class EventLikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.eventLikes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity | string ;

  @ManyToOne(() => EventEntity, (event) => event.eventLikes)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity | string ;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
