import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DatabaseQueryFailedResponseDTO,
  ErrorResponseDTO,
  SuccessResponseDTO,
} from '../dtos/response.dto';
import { RegistrationDTO } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('/sign-up')
  @ApiOperation({ summary: 'Register a new user' })
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
    const isUserExist = await this.userService.getByEmail(body.email);
    if (isUserExist) {
      throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
    }
    body.password = await this.authService.hashPassword(body.password);

    await this.userService.createUser(body);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
    };
  }
}
