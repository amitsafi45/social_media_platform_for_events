import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DatabaseQueryFailedResponseDTO,
  ErrorResponseDTO,
  SuccessResponseDTO,
} from '../dtos/response.dto';
import { RegistrationDTO } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post('/sign-up')
  @ApiBody({ type: RegistrationDTO })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    type: ErrorResponseDTO,
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 500,
    description:
      'Database query failed (In this case contact with Backend Developer)',
    type: DatabaseQueryFailedResponseDTO,
  })
  async registration(
    @Body() body: RegistrationDTO,
  ): Promise<
    SuccessResponseDTO | ErrorResponseDTO | DatabaseQueryFailedResponseDTO
  > {
    await this.userService.createUser(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
    };
  }
}
