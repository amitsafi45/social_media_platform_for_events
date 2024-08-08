import { Injectable } from '@nestjs/common';
import { EventDTO } from '@dtos/event.dto';
import { EventTransactionRepository } from '@repository/event.repository';
@Injectable()
export class EventService {
  constructor(
    private readonly EventTransactionRepository: EventTransactionRepository,
  ) {}
  async create(data: EventDTO) {
    return await this.EventTransactionRepository.createEventWithMedia(data);
  }
}
