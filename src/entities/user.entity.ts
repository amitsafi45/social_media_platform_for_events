import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';
import { TokenEntity } from './token.entity';
import { ProfileMediaEntity } from './profileMedia.entity';
import { FollowUserEntity } from './followUser.entity';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 255 }) // Changed to varchar for hashed password
  password: string;

  @OneToMany(() => EventEntity, (event) => event.creator)
  events: EventEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.commentator)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];

  @OneToOne(() => ProfileMediaEntity, (media) => media.user)
  profileMedia: ProfileMediaEntity;

  @OneToMany(() => FollowUserEntity, (follow) => follow.followUser)
  following: FollowUserEntity[];

  @OneToMany(() => FollowUserEntity, (follow) => follow.followedBy)
  followedBy: FollowUserEntity[];
}