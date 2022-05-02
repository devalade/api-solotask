import { StatusEntity } from '@src/status/status.entity';
import { TaskEntity } from '@src/task/task.entity';
import { UsersEntity } from '@src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => StatusEntity, (status) => status.project)
  @JoinTable()
  status: StatusEntity[];

  @OneToMany(() => TaskEntity, (task) => task.status, {
    onDelete: 'CASCADE',
  })
  tasks: TaskEntity[];

  @ManyToMany(() => UsersEntity, (users) => users.project)
  @JoinTable({ name: 'participate_to_project' })
  users: UsersEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
