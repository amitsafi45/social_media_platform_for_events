import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    return 'Welcome to the Social Media Platform for Events Backend Service.';
  }
}
