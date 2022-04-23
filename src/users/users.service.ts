import { Get, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './users.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  // constructor() {}
}
