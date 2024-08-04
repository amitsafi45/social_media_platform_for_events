import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventCategory } from '../constants/enum';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';
import { EventMediaEntity } from './eventMedia.entity';

@Entity('event')
export class EventEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: 500 })
  description: string;

  @Column({ name: 'date', type: 'date', nullable: true, default: null })
  date: Date;

  @Column({ name: 'time', type: 'time', nullable: true, default: null })
  time: string | null;

  @Column({
    name: 'location',
    type: 'varchar',
    length: 200,
    nullable: true,
    default: null,
  })
  location: string | null;

  @Column({
    name: 'category',
    type: 'enum',
    nullable: true,
    enum: EventCategory,
    default: null,
  })
  category: string | null;

  @ManyToOne(() => UserEntity, (creator) => creator.events)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.event)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.event)
  likes: LikeEntity[];

  @OneToMany(() => EventMediaEntity, (media) => media.event)
  eventMedia: EventMediaEntity[];
}
