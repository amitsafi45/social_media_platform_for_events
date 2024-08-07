import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '@entities/event.entity';
import { EventMediaEntity } from '@entities/eventMedia.entity';
import { UserEntity } from '@entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,
    @InjectRepository(EventMediaEntity)
    private eventMediaRepo: Repository<EventMediaEntity>,
  ) {}
}
