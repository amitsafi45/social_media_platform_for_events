import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidate } from './utils/envValidator';
import { typeOrmConfig } from '@configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MediaModule } from '@modules/media.module';
import { EventModule } from '@modules/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validate: envValidate,
    }),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    MediaModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
