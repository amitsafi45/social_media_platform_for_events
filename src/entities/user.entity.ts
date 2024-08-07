import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from '@entities/event.entity';
import { CommentEntity } from '@entities/comment.entity';
import { LikeEntity } from '@entities/like.entity';
import { TokenEntity } from '@entities/token.entity';
import { ProfileMediaEntity } from '@entities/profileMedia.entity';
import { FollowUserEntity } from '@entities/followUser.entity';
import { BaseEntity } from '@entities/base.entity';
import { CharacterLength } from '@constants/enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: CharacterLength.ONE_HUNDRED })
  name: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: CharacterLength.ONE_HUNDRED,
  })
  email: string;

  @Column({ type: 'varchar', length: CharacterLength.TWO_HUNDRED_FIFTY_FIVE }) // Changed to varchar for hashed password
  password: string;

  @OneToMany(() => EventEntity, (event) => event.creator)
  events: EventEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.commentator)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => TokenEntity, (token) => token.user, { cascade: true })
  tokens: TokenEntity[];

  @OneToOne(() => ProfileMediaEntity, (media) => media.user)
  profileMedia: ProfileMediaEntity;

  @OneToMany(() => FollowUserEntity, (follow) => follow.followUser)
  following: FollowUserEntity[];

  @OneToMany(() => FollowUserEntity, (follow) => follow.followedBy)
  followedBy: FollowUserEntity[];
}
