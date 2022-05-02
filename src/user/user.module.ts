import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { ProjectEntity } from '@src/project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProjectEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
