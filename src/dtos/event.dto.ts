import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsTimeZone,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CharacterLength, EventCategory } from '@constants/enum';
import { MediaDTO } from './media.dto';
import { Type } from 'class-transformer';
import { SuccessResponseDTO } from './response.dto';

export class EventDTO {
  @ApiProperty({
    description: 'The title of the event',
    maxLength: CharacterLength.ONE_HUNDRED,
    example: 'Jazz Music Concert',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(CharacterLength.ONE_HUNDRED)
  title: string;

  @ApiProperty({
    description: 'A detailed description of the event',
    maxLength: CharacterLength.FIVE_HUNDRED,
    example: 'Join us for an evening of smooth jazz and great company. Featuring top local artists.',
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
    example: '2024-08-07T18:30:00Z',
  })
  @IsOptional()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'The time of the event',
    required: false,
    example: '3:00 PM',
  })
  @IsOptional()
  @Matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, {
    message: 'time must be in the format hh:mm AM/PM',
  })
  time: string | null;

  @ApiProperty({
    description: 'The location of the event',
    required: false,
    maxLength: CharacterLength.TWO_HUNDRED,
    example: '123 Jazz Street, New York, NY',
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
  category: EventCategory | null;

  @ApiProperty({
    description: 'Media details associated with the event',
    type: MediaDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MediaDTO)
  media?: MediaDTO;

  
  creator:string
}

