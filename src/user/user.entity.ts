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
import { ProjectEntity } from '@src/project/project.entity';

@Entity('user')
export class UserEntity {
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

  @Column({ unique: true, nullable: true })
  refreshTokenHash: string;

  @ManyToMany(() => ProjectEntity, (project) => project.user)
  @JoinTable({ name: 'participate_to_project' })
  project: ProjectEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  async comparePassword(incomePassowrd: string) {
    return await argon2.verify(this.password, incomePassowrd);
  }

  async compareRefreshTokenshash(incomePassowrd: string) {
    return await argon2.verify(this.refreshTokenHash, incomePassowrd);
  }
}
