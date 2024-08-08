import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from '@utils/base-repository';
import { DataSource } from 'typeorm';
import { EventEntity } from '@entities/event.entity';
import { EventDTO } from '@dtos/event.dto';
import { EventMediaEntity } from '@entities/eventMedia.entity';

@Injectable({ scope: Scope.REQUEST })
export class EventTransactionRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async createEventWithMedia(data: EventDTO) {
    const { media, creator, ...eventDetail } = data;
    const saveEvent = (
      await this.getRepository(EventEntity).insert({
        creator: creator,
        ...eventDetail,
      })
    ).identifiers;
    if (media) {
      const newMediaArray = await Promise.all(
        media.data.map(async (element) => {
          return { path: element.name, event: saveEvent[0].id };
        }),
      );
      await this.getRepository(EventMediaEntity).insert(newMediaArray);
    }
  }
}
