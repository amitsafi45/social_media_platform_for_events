import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { CharacterLength } from 'src/constants/enum';

export class RegistrationDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    maxLength: CharacterLength.ONE_HUNDRED,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(CharacterLength.ONE_HUNDRED)
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    maxLength: CharacterLength.ONE_HUNDRED,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(CharacterLength.ONE_HUNDRED)
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
