import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.log(`Request... ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      this.logger.log(`Response... ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
  }
}
