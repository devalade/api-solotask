import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto, SignInDto } from './auth.dto';
// import { AuthDto } from './dto';
// import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signup(@Body() data: AuthDto) {
    const isAlreadyExist = await this.userService.findByEmail(data.email);

    if (isAlreadyExist) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Credentials has been taken',
      };
    }
    const user = await this.userService.store<AuthDto>(data);

    return {
      status: HttpStatus.CREATED,
      data: user,
      message: 'User created successfully',
    };
  }

  @Post('signin')
  async signin(@Body() data: SignInDto) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Email or password not correct',
      };
    }

    const isMatch = user.compare(data.password);
    if (!isMatch) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Email or password not correct',
      };
    }
    delete user.password;

    return {
      status: HttpStatus.OK,
      message: 'User is connected successfully',
      user,
    };
  }
}
