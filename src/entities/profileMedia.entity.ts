import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { CharacterLength } from 'src/constants/enum';

@Entity('profile_media')
@Unique(['user'])
export class ProfileMediaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: CharacterLength.TWO_HUNDRED })
  path: string;

  @OneToOne(() => UserEntity, (user) => user.profileMedia)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
