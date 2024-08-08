import { FollowUserDTO } from '@dtos/user.dto';
import { FollowUserEntity } from '@entities/followUser.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowUserService {
  constructor(
    @InjectRepository(FollowUserEntity)
    private readonly followUserRepo: Repository<FollowUserEntity>,
  ) {}

  async follow(data: FollowUserDTO): Promise<void> {
    await this.followUserRepo.insert({
      followerUser: data.followUser,
      followingUser: data.followingUser,
    });
  }

  async unfollow(data: FollowUserDTO): Promise<void> {
    await this.followUserRepo.delete({
      followerUser: data.followUser,
      followingUser: data.followingUser,
    });
  }
}
