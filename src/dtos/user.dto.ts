import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { CharacterLength } from '@constants/enum';
import { SuccessResponseDTO } from './response.dto';
export class CommonDTO {
  @ApiProperty({
    description:
      'This value is case-insensitive and will be converted to lowercase before validation.',
    example: 'john.doe@example.com',
    maxLength: CharacterLength.ONE_HUNDRED,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(CharacterLength.ONE_HUNDRED)
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'P@ssw10rd!',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 2,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
export class SignInDTO extends CommonDTO {}

export class RegistrationDTO extends CommonDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    maxLength: CharacterLength.ONE_HUNDRED,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(CharacterLength.ONE_HUNDRED)
  name: string;
}

export class FollowUserDTO {
  @ApiProperty({
    description: 'The UUID of the user who is being followed.',
    type: String,
    example: 'e2e5bff7-bf8e-4c57-8a59-33e09cde4b1f',
  })
  @IsNotEmpty()
  @IsUUID()
  followUser: string;

  followingUser: string;
}

export class LikeDTO {
  @ApiProperty({
    description: 'The UUID of the user who is being followed.',
    type: String,
    example: 'e2e5bff7-bf8e-4c57-8a59-33e09cde4b1f',
  })
  @IsNotEmpty()
  @IsUUID()
  event: string;

  user: string;
}

class UserProfileDTO {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'Name of the user' })
  name: string;

  @ApiProperty({ description: 'Email address of the user' })
  email: string;
}

class FollowUserDetailsDTO {
  @ApiProperty({ description: 'Unique identifier of the follow relationship' })
  id: string;

  @ApiProperty({
    description: 'Timestamp when the follow relationship was created',
  })
  createdAt: Date;

  @ApiProperty({ description: 'Details of the follower user' })
  followerUser?: UserProfileDTO;

  @ApiProperty({ description: 'Details of the following user' })
  followingUser?: UserProfileDTO;
}

export class UserProfileResponseDTO {
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'Name of the user' })
  name: string;

  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @ApiProperty({
    description: 'List of users the current user is following',
    type: [FollowUserDetailsDTO],
  })
  following: FollowUserDetailsDTO[];

  @ApiProperty({
    description: 'List of users following the current user',
    type: [FollowUserDetailsDTO],
  })
  follower: FollowUserDetailsDTO[];
}

export class ProfileResponseDTO extends SuccessResponseDTO {
  @ApiProperty({ description: ' Profile Object', type: UserProfileResponseDTO })
  data: UserProfileResponseDTO;
}
