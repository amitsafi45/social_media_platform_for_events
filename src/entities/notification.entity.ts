import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CharacterLength } from '@constants/enum';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.sentNotifications, {
    nullable: false,
  })
  @JoinColumn({ name: 'sender_id' })
  sender: UserEntity | string;

  @ManyToOne(() => UserEntity, (user) => user.receivedNotifications, {
    nullable: false,
  })
  @JoinColumn({ name: 'receiver_id' })
  receiver: UserEntity | string;

  @Column({
    type: 'varchar',
    length: CharacterLength.TWO_HUNDRED,
    name: 'content_id',
  })
  contentId: string;

  @Column({ type: 'varchar', length: CharacterLength.ONE_HUNDRED })
  title: string;

  @Column({ type: 'varchar', length: CharacterLength.TWO_HUNDRED })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;
}
