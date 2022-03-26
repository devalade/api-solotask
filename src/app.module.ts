import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsEntity } from './projects/projects.entity';
import { StatusModule } from './status/status.module';
import { StatusEntity } from './status/status.entity';
import { TaskModule } from './task/task.module';
import { TaskEntity } from './task/task.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'devalade',
      password: 'devalade',
      database: 'projectmanager',
      entities: [UsersEntity, ProjectsEntity, StatusEntity, TaskEntity],
      synchronize: true,
    }),
    UsersModule,
    ProjectsModule,
    StatusModule,
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
