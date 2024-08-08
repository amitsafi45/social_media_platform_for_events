import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { EventEntity } from '@entities/event.entity';
import { UserEntity } from '@entities/user.entity';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 200, name: 'description' })
  description: string;

  @ManyToOne(() => EventEntity, (event) => event.comments)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity | string ;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'commentator_id' })
  commentator: UserEntity | string ;
}
