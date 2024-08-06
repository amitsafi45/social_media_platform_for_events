import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DatabaseQueryFailedResponseDTO,
  ErrorResponseDTO,
  SuccessResponseDTO,
} from '../dtos/response.dto';
import { RegistrationDTO, SignInDTO } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/services/token.service';
import { RefreshTokenDTO, SignInResponseDTO } from 'src/dtos/auth.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}
  @Post('/sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegistrationDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: SuccessResponseDTO,
  })
  @ApiResponse({
    type: ErrorResponseDTO,
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
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

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign-In user' })
  @ApiBody({ type: SignInDTO })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'User sign-in successfully',
    type: SignInResponseDTO,
  })
  @ApiResponse({
    type: ErrorResponseDTO,
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async signIn(@Body() body: SignInDTO): Promise<SignInResponseDTO> {
    const isUserExist = await this.userService.getByEmail(body.email);
    if (
      isUserExist &&
      (await this.authService.comparePassword(
        body.password,
        isUserExist.password,
      ))
    ) {
      const { password, ...rest } = isUserExist;
      const token = await this.authService.tokenGenerator(rest);
      const accessExpiresIn = await this.jwtService.decode(token.access);
      const refreshExpiresIn = await this.jwtService.decode(token.refresh);
      await this.tokenService.create(token.refresh, isUserExist.id);
      return {
        statusCode: HttpStatus.ACCEPTED,
        success: true,
        message: 'User sign-in successfully',
        data: {
          ...rest,
          token: token,
          expire: {
            accessIn: accessExpiresIn.exp,
            refreshIn: refreshExpiresIn.exp,
          },
        },
      };
    } else {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/refresh')
  async refreshToken(@Body() body: RefreshTokenDTO, @Req() req) {
    const refreshSecretKey = await this.configService.get('REFRESH_SECRET_KEY');
    let user;
    try {
      user = await this.authService.verifyToken(body.token, refreshSecretKey);
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    const isTokenExist = await this.tokenService.getByTokenAndUserId(
      body.token,
      user.id,
    );
    if (!isTokenExist) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    const payload = { id: user.id, email: user.email, name: user.name };
    const token = await this.authService.tokenGenerator(payload);
    const accessExpiresIn = await this.jwtService.decode(token.access);
    const refreshExpiresIn = await this.jwtService.decode(token.refresh);
    await this.tokenService.create(token.refresh, user.id.id);
    await this.tokenService.deleteById(isTokenExist.id);

    return {
      statusCode: HttpStatus.ACCEPTED,
      success: true,
      message: 'User sign-in successfully',
      data: {
        ...payload,
        token: token,
        expire: {
          accessIn: accessExpiresIn.exp,
          refreshIn: refreshExpiresIn.exp,
        },
      },
    };
  }
}
