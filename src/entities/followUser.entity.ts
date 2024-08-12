import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, 
  Unique,
} from 'typeorm';
import { UserEntity } from '@entities/user.entity';

@Entity('follow_user')
@Unique(['followingUser', 'followerUser'])
export class FollowUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.following, { nullable: false })
  @JoinColumn({ name: 'following_id' })
  followingUser: UserEntity | string;

  @ManyToOne(() => UserEntity, (user) => user.follower, { nullable: false })
  @JoinColumn({ name: 'follower_id' })
  followerUser: UserEntity | string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
