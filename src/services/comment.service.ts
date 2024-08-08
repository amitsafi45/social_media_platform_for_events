import { CommentDTO } from '@dtos/event.dto';
import { CommentEntity } from '@entities/comment.entity';
import { Controller, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  async create(data: CommentDTO): Promise<void> {
    await this.commentRepo.insert(data);
  }
}
