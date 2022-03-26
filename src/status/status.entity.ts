import { ProjectsEntity } from '@src/projects/projects.entity';
import { TaskEntity } from '@src/task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('status')
export class StatusEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => ProjectsEntity, (project) => project.status)
  @JoinTable()
  project: ProjectsEntity;

  @OneToMany(() => TaskEntity, (task) => task.status)
  @JoinTable()
  tasks: TaskEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
