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
@Unique(['followUser', 'followedBy'])
export class FollowUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.following, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  followUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followedBy, { nullable: false })
  @JoinColumn({ name: 'followed_by_id' })
  followedBy: UserEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
