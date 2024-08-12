import { FollowUserDTO } from '@dtos/user.dto';
import { FollowUserEntity } from '@entities/followUser.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

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

  async isFollowed(followingId: string, followerId: string) {
    return await this.followUserRepo.findOne({
      where: {
        followingUser: {
          id: followingId,
        },
        followerUser: {
          id: followerId,
        },
      },
    });
  }

  async getFollowRecords(followingId: string, followerId: string[]){
    
    return await this.followUserRepo.find({
      where: {
        followingUser: {
          id: followingId,
        },
        followerUser: {
          id: In(followerId),
        },
      },
    });
  }

}
