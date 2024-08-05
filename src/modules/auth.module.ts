import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [UserService],
  exports: [],
})
export class AuthModule {}
