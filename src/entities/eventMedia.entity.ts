import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { EventEntity } from '@entities/event.entity';
import { CharacterLength } from '@constants/enum';

@Entity('event_media')
export class EventMediaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: CharacterLength.TWO_HUNDRED })
  path: string;

  @ManyToOne(() => EventEntity, (event) => event.eventMedia)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity | string;

  
}
