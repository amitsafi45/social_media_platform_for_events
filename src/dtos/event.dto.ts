import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsTimeZone,
  IsUUID,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CharacterLength, EventCategory } from '@constants/enum';
import { MediaDTO } from './media.dto';
import { Type } from 'class-transformer';
import { SuccessResponseDTO } from './response.dto';
import { UserProfileDTO } from './user.dto';

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
    example:
      'Join us for an evening of smooth jazz and great company. Featuring top local artists.',
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

  creator: string;
}

export class CommentDTO {
  @ApiProperty({
    description: 'A detailed description of the comment',
    maxLength: 200,
    example:
      'Join us for an evening of smooth jazz and great company. Featuring top local artists.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  description: string;

  @ApiProperty({
    description: 'The ID of the event the comment is associated with',
    example: 'd3b07384d113edec49eaa6238ad5ff00',
  })
  @IsNotEmpty()
  @IsUUID()
  event: string;

  commentator: string;
}

export class EventListDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ type: UserProfileDTO })
  creator: UserProfileDTO;
}

export class PaginatedEventResponseDto extends SuccessResponseDTO {
  @ApiProperty({ type: [EventListDTO] })
  data: EventListDTO[];

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;
}

export class EventListResponseDTO extends PaginatedEventResponseDto {}
export class EventByCreatorIDAndEventId {
  @ApiProperty({
    description: 'Event ID',
  })
  event: string;

  @ApiProperty({
    description: ' Event Creator ID',
  })
  creator: string;
}

export class EventLikeDTO {
  @ApiProperty({
    description: 'Like ID',
    example: 'abf4191f-9d09-45af-925f-96987ac9914d',
  })
  id: string;

  @ApiProperty({
    description: 'Created timestamp of the like',
    example: '2024-08-11T02:40:52.793Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'User who liked the event',
    type: UserProfileDTO,
  })
  user: UserProfileDTO;
}
export class EventMediaDTO {
  @ApiProperty({
    description: 'Media ID',
    example: '52e786e2-18d5-4baf-81c0-1d91848ac1cb',
  })
  id: string;

  @ApiProperty({
    description: 'Path to the media file',
    example:
      'localhost:4000/john.doe1/event/2024-08-11__b492bc__Screenshot.png',
  })
  path: string;
}

export class EventDetailResponseDTO {
  @ApiProperty({
    description: 'Event details',
    type: EventDTO,
  })
  event: EventDTO;

  @ApiProperty({
    description: 'Comments on the event',
    type: [CommentDTO],
  })
  comments: CommentDTO[];

  @ApiProperty({
    description: 'Likes on the event',
    type: [EventLikeDTO],
  })
  eventLikes: EventLikeDTO[];

  @ApiProperty({
    description: 'Media associated with the event',
    type: [EventMediaDTO],
  })
  eventMedia: EventMediaDTO[];
}
