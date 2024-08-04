import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidate } from './utils/envValidator';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: true,
      isGlobal: true,
      validate: envValidate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
