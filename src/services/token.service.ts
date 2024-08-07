import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '@entities/token.entity';
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

  async getByTokenAndUserId(token: string, userId: string) {
    return this.tokenRepository.findOne({
      where: {
        token: token,
        user: userId,
      },
    });
  }
  async deleteById(id: string) {
    await this.tokenRepository.delete(id);
  }
}
