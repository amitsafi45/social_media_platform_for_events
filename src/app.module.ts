import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidate } from './utils/envValidator';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validate: envValidate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
