import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDTO } from './response.dto';

class TokenDTO {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMGM5OWRiYi0yMTQwLTQyMzctOGNl.....',
  })
  access: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMGM5OWRiYi0yMTQwLTQyMzctOGNl......',
  })
  refresh: string;
}

class ExpireDTO {
  @ApiProperty({
    description: 'Access token expiration time in Unix timestamp',
    example: 1722992695,
  })
  accessIn: number;

  @ApiProperty({
    description: 'Refresh token expiration time in Unix timestamp',
    example: 1723079095,
  })
  refreshIn: number;
}

class UserDataDTO {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'f0c99dbb-2140-4237-8cec-29a624182d46',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'JWT tokens for user authentication',
    type: TokenDTO,
  })
  token: TokenDTO;

  @ApiProperty({
    description: 'Expiration times for the tokens',
    type: ExpireDTO,
  })
  expire: ExpireDTO;
}

export class SignInResponseDTO extends SuccessResponseDTO {
  @ApiProperty({
    description: 'Data related to the signed-in user',
    type: UserDataDTO,
  })
  data: UserDataDTO;
}
