import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Not, Repository } from 'typeorm';
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
      select: {
        email: true,
        id: true,
        password: true,
      },
    });
  }

  async getProfile(requestorId: string) {
    const userId = requestorId; // Replace with the actual user ID

    const userProfile = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.following', 'following')
      .leftJoinAndSelect('following.followerUser', 'followingUser')
      .leftJoinAndSelect('user.follower', 'followers')
      .leftJoinAndSelect('followers.followingUser', 'followerUser')
      .where('user.id = :userId', { userId })
      .andWhere('user.deletedAt IS NULL')
      .getOneOrFail();
    return userProfile;
  }
}
