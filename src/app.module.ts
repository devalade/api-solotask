import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { ProjectEntity } from './project/project.entity';
import { StatusModule } from './status/status.module';
import { StatusEntity } from './status/status.entity';
import { TaskModule } from './task/task.module';
import { TaskEntity } from './task/task.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/decorators/guards';

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
      entities: [UsersEntity, ProjectEntity, StatusEntity, TaskEntity],
      synchronize: true,
    }),
    UsersModule,
    ProjectModule,
    StatusModule,
    TaskModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection, private config: ConfigService) {}
}
