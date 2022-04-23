import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CreateUsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
}
