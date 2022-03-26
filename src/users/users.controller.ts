import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CreateUsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(@Body() data: CreateUsersDto) {
    const user = await this.userService.findByEmail(data.email);

    console.log(user);
    return {
      status: HttpStatus.OK,
      data: user,
      message: 'User created successfully',
    };
  }
}
