import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [UsersService, AtStrategy, RtStrategy, AuthService],
})
export class AuthModule {}
