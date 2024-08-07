import { ApiProperty, ApiConsumes } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
  MaxLength,
} from 'class-validator';
import { CharacterLength, EventCategory } from '@constants/enum';

// @ApiConsumes()
export class EventDTO {
  @ApiProperty({
    description: 'The title of the event',
    maxLength: CharacterLength.ONE_HUNDRED,
    example: 'Annual Meeting',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(CharacterLength.ONE_HUNDRED)
  title: string;

  @ApiProperty({
    description: 'A detailed description of the event',
    maxLength: CharacterLength.FIVE_HUNDRED,
    example:
      'This event is held annually to discuss company achievements and future plans.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(CharacterLength.FIVE_HUNDRED)
  description: string;

  @ApiProperty({
    description: 'The date of the event',
    required: false,
    type: String,
    format: 'date-time',
    example: '2024-08-07T10:30:00Z',
  })
  @IsOptional()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'The time of the event in a specific time zone',
    required: false,
    example: 'America/New_York',
  })
  @IsOptional()
  @IsTimeZone()
  time: string | null;

  @ApiProperty({
    description: 'The location of the event',
    required: false,
    maxLength: CharacterLength.TWO_HUNDRED,
    example: '123 Main Street, New York, NY',
  })
  @IsOptional()
  @IsString()
  @MaxLength(CharacterLength.TWO_HUNDRED)
  location: string | null;

  @ApiProperty({
    description: 'The category of the event',
    required: false,
    enum: EventCategory,
    example: EventCategory.Music,
  })
  @IsOptional()
  @IsEnum(EventCategory)
  category: string | null;
}
