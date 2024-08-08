import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventCategory } from '../constants/enum';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { EventLikeEntity } from './eventLike.entity';
import { EventMediaEntity } from './eventMedia.entity';

@Entity('event')
export class EventEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 500 })
  description: string;

  @Column({ name: 'date', type: 'date', nullable: true })
  date: Date;

  @Column({ name: 'time', type: 'time', nullable: true })
  time: string | null;

  @Column({
    name: 'location',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  location: string | null;

  @Column({
    name: 'category',
    type: 'enum',
    default: EventCategory.None,
    enum: EventCategory,
  })
  category: EventCategory;

  @ManyToOne(() => UserEntity, (creator) => creator.events)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity | string;

  @OneToMany(() => CommentEntity, (comment) => comment.event)
  comments: CommentEntity[];

  @OneToMany(() => EventLikeEntity, (eventLikes) => eventLikes.event)
  eventLikes: EventLikeEntity[];

  @OneToMany(() => EventMediaEntity, (media) => media.event)
  eventMedia: EventMediaEntity[];
}
