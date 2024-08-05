import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegistrationDTO } from 'src/dtos/user.dto';
import { AuthService } from './auth.service';

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
