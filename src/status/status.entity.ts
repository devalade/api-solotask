import { ProjectEntity } from '@src/project/project.entity';
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

  @ManyToOne(() => ProjectEntity, (project) => project.status)
  @JoinTable()
  project: ProjectEntity;

  @OneToMany(() => TaskEntity, (task) => task.status)
  @JoinTable()
  tasks: TaskEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
