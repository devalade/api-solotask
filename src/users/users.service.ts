import { Get, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './users.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async store<T>(user: T) {
    const data = this.usersRepository.create(user);
    await this.usersRepository.save(data);
    delete data.password;
    return data;
  }

  @Get()
  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UsersEntity> {
    return this.usersRepository.findOne(id);
  }

  findByEmail(@Param('email') email: string): Promise<UsersEntity> {
    return this.usersRepository.findOne({
      select: ['email', 'password'],
      where: { email: email },
    });
  }

  async remove(@Param('id') id: string) {
    await this.usersRepository.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
