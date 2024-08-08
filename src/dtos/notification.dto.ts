import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateNotificationDTO {
  @ApiProperty({
    description: 'UUID of the user sending the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  sender: string ;

  @ApiProperty({
    description: 'UUID of the user receiving the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  receiver: string;

  @ApiProperty({
    description: 'Title of the notification',
    example: 'New Event Created',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Content of the notification',
    example: 'You have a new event invitation.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content: string;

  @ApiProperty({
    description: 'UUID of the content associated with the notification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  contentId: string;
}
