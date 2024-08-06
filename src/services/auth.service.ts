import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async tokenGenerator(payload): Promise<{ access: string; refresh: string }> {
    return {
      access: await this.jwtService.signAsync(
        {
          sub: payload.id,
          email: payload.email,
          name: payload.name,
        },
        {
          secret: this.configService.get('ACCESS_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      ),
      refresh: await this.jwtService.signAsync(
        {
          sub: payload.id,
          email: payload.email,
          name: payload.name,
        },
        {
          secret: this.configService.get('REFRESH_SECRET_KEY'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      ),
    };
  }

  async verifyToken(token: string, secretKey: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: secretKey,
    });
  }
}
