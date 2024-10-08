import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Brackets, Not, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RegistrationDTO } from '@dtos/user.dto';
import { calculatePagination, paginate } from '@utils/pagination.util';

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
  async profileList(
    requestor: string,
    search: string,
    limit: number = 10,
    page: number = 1,
  ) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.following', 'following')
      .leftJoinAndSelect('following.followerUser', 'followingUser')
      .leftJoinAndSelect('user.follower', 'followers')
      .leftJoinAndSelect('followers.followingUser', 'followerUser')
      .select([
        'user.id as id',
        'user.name as name',
        'user.email as email',
        `CASE WHEN followingUser.id = :requestor THEN true ELSE false END AS isFollower`,
        `CASE WHEN followerUser.id = :requestor THEN true ELSE false END AS isFollowing`,
      ])
      .where('user.id != :requestor', { requestor }) 
    if (search && search.trim()) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user.name ILIKE :search', {
            search: `%${search}%`,
          }).orWhere('user.email ILIKE :search', { search: `%${search}%` });
        }),
      );
    }
    const results = await query.getRawMany(); 
    const total=results.length
    const pagination = calculatePagination(total, page, limit);

    return {
      data: results,
      ...pagination,
    };
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
