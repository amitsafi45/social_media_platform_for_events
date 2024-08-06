import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { TokenEntity } from 'src/entities/token.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TokenEntity])],
  controllers: [AuthController],
  providers: [UserService, AuthService, TokenService],
  exports: [],
})
export class AuthModule {}
