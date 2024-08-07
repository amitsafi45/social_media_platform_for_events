import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { UserEntity } from '@entities/user.entity';
import { CharacterLength } from '@constants/enum';

@Entity('profile_media')
@Unique(['user'])
export class ProfileMediaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: CharacterLength.TWO_HUNDRED })
  path: string;

  @OneToOne(() => UserEntity, (user) => user.profileMedia)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
