import { StatusEntity } from '@src/status/status.entity';
import { TaskEntity } from '@src/task/task.entity';
import { UserEntity } from '@src/user/user.entity';
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

  @ManyToMany(() => UserEntity, (user) => user.project)
  @JoinTable({ name: 'participate_to_project' })
  user: UserEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
