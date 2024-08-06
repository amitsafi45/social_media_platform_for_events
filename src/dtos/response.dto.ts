import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDTO {
  @ApiProperty({
    description: 'HTTP status code',
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Success status of the response',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Success message',
    example: 'Task done successfully',
  })
  message: string;
}

export class ErrorResponseDTO {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Success status of the response',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message describing what went wrong',
    example: 'error message',
  })
  message: string;
}

export class DatabaseQueryFailedResponseDTO {
  @ApiProperty({
    description: 'HTTP status code',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Status of the response',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: 'Error message describing what went wrong',
    example: 'Database query failed due to invalid input.',
  })
  message: string;
}
