import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@controllers/auth.controller';
import { TokenEntity } from '@entities/token.entity';
import { UserEntity } from '@entities/user.entity';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  controllers: [AuthController],
  providers: [UserService, AuthService, TokenService],
  exports: [],
})
export class AuthModule {}
