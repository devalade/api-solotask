import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersController } from './users.controller';
import { ProjectsEntity } from '@src/projects/projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, ProjectsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
