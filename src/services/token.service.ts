import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(refreshToken: string, userId: string): Promise<void> {
    await this.tokenRepository.insert({ token: refreshToken, user: userId });
  }
}
