import { ProjectEntity } from '@src/project/project.entity';
import { StatusEntity } from '@src/status/status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => StatusEntity, (status) => status.tasks)
  @JoinTable()
  status: StatusEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinTable()
  project: ProjectEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
