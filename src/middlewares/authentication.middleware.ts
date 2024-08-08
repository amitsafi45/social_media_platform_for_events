import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from '@nestjs/common';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  async use(@Req() req: Request, @Res() res: Response, next: () => void) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      return this.unauthorizedResponse(res, 'Authorization header is missing');
    }

    const accessToken = authorizationHeader.replace('Bearer', '').trim();
    const secretKey = await this.configService.get('ACCESS_SECRET_KEY');
    let user;
    try {
      user = await this.jwtService.verifyAsync(accessToken, {
        secret: secretKey,
      });
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return this.unauthorizedResponse(res, 'Invalid or expired token');
    }

    req['user'] = user; // Attach the user to the request object
    next(); // Pass control to the next middleware or route handler
  }

  private unauthorizedResponse(res: Response, message: string) {
    const { httpAdapter } = this.httpAdapterHost;
    const responseBody = {
      statusCode: HttpStatus.UNAUTHORIZED,
      success: false,
      message,
    };
    return httpAdapter.reply(res, responseBody, HttpStatus.UNAUTHORIZED);
  }
}
