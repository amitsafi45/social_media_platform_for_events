import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { Environment } from '@constants/enum';
import { EventEntitySubscriber } from 'subscribers/event.subscribe';
import { CommentEntitySubscriber } from 'subscribers/comment.subscribe';
import { EventLikeEntitySubscriber } from 'subscribers/eventLike.subscribe';
export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions & DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [
    join(__dirname, '..', 'entities', '**', '*.entity.{ts,js}'), // Handles both .ts and .js files in all subdirectories
  ],
  subscribers: [
    join(__dirname, '..', 'subscribers', '**', '*.subscribe.{ts,js}'),
  ],
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
  logging: configService.get<boolean>(
    'DB_LOGGING',
    configService.get('ENVIRONMENT') === Environment.Development ? true : false,
  ),
  migrations: [join(__dirname, '..', 'migrations/*{.ts,.js}')],
  extra: {
    max: configService.get<number>('DB_MAX_CONNECTIONS', 10), // Connection pool settings
  },
});
