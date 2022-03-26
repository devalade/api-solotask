import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './projects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
})
export class ProjectsModule {}
