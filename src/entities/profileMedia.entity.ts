import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('profile_media')
@Unique(['user'])
export class ProfileMediaEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  path: string;

  @OneToOne(() => UserEntity, (user) => user.profileMedia)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
