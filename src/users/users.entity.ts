import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as argon2 from 'argon2';
import { ProjectsEntity } from '@src/projects/projects.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => ProjectsEntity, (project) => project.users)
  @JoinTable({ name: 'participate_to_project' })
  projects: ProjectsEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  async compare(incomePassowrd: string) {
    return await argon2.verify(this.password, incomePassowrd);
  }
}
