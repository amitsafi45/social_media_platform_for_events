import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RegistrationDTO } from '@dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: RegistrationDTO): Promise<void> {
    await this.userRepository.insert({ ...data });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }
}
