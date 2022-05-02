import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersController } from './users.controller';
import { ProjectEntity } from '@src/project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, ProjectEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
