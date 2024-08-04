import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventEntity } from './event.entity';

@Entity('event_media')
export class EventMediaEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  path: string;

  @ManyToOne(() => EventEntity, (event) => event.eventMedia)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
