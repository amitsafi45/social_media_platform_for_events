import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, ValidateNested, IsArray, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { MediaType } from '@constants/enum';

export class MediaObjectDTO {
  @ApiProperty({ description: 'The name of the media object', example: '2024-08-07T17:38:16.507Z__2739dc__Screenshot (4).png' })
  @IsNotEmpty()
  @IsString()
  name: string;

}

export class MediaDTO {
  @ApiProperty({ description: 'The type of media', enum: MediaType, example: MediaType.Event })
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @ApiProperty({
    description: 'Array of media objects',
    type: [MediaObjectDTO],
    example: [
      { name: '2024-08-07T17:38:16.507Z__2739dc__Screenshot (4).png' },
      { name: '2024-08-07T17:38:16.507Z__4812e0__Screenshot (4).png' }
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MediaObjectDTO)
  data: MediaObjectDTO[];
}
