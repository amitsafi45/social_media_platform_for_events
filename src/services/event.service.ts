import { Injectable } from '@nestjs/common';
import { EventDTO } from '@dtos/event.dto';
import { EventTransactionRepository } from '@repository/event.repository';
import { Brackets, Not, Repository } from 'typeorm';
import { EventEntity } from '@entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategory } from '@constants/enum';
import { calculatePagination, paginate } from '@utils/pagination.util';
@Injectable()
export class EventService {
  constructor(
    private readonly EventTransactionRepository: EventTransactionRepository,
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
  ) {}
  async create(data: EventDTO) {
    return await this.EventTransactionRepository.createEventWithMedia(data);
  }

  async eventList(
    creator: string,
    category: EventCategory = EventCategory.None,
    search: string,
    limit: number,
    page: number,
  ) {
    const query = this.eventRepo
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.creator', 'creator')
      .select([
        'event.id',
        'event.title',
        'event.category',
        'creator.id',
        'creator.name',
        'creator.email',
      ])
      .where('creator.id != :creatorId', { creatorId: creator });

    // Filter by category if it's not 'None'
    if (category !== EventCategory.None) {
      query.andWhere('event.category = :type', { type: category });
    }

    // Perform case-insensitive search in title, creator name, and email
    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(event.title) ILIKE LOWER(:searchTerm)', {
            searchTerm: `%${search}%`,
          })
            .orWhere('LOWER(creator.name) ILIKE LOWER(:searchTerm)', {
              searchTerm: `%${search}%`,
            })
            .orWhere('LOWER(creator.email) ILIKE LOWER(:searchTerm)', {
              searchTerm: `%${search}%`,
            });
        }),
      );
    }

    paginate(query, page, limit);

    const [results, total] = await query.getManyAndCount();
    const pagination = calculatePagination(total, page, limit);

    return {
      data: results,
      ...pagination,
    };
  }
}
