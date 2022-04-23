import {
  ForbiddenException,
  Get,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@src/users/users.entity';
import { IsNull, Not, QueryFailedError, Repository } from 'typeorm';
import { AuthDto, SignInDto } from './dto';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const newUser = this.usersRepository.create({
      email: dto.email,
      password: dto.password,
      lastName: dto.lastName,
      firstName: dto.firstName,
    });
    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      if (error instanceof QueryFailedError && error['code'] == 23505) {
        throw new ForbiddenException('Email already exist');
      }
      console.log(error);
    }

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateResfreshTokenHash(newUser.id, tokens.refresh_token);
    // const hash = await argon2.hash(refreshToken);

    return tokens;
  }

  async signinLocal(dto: SignInDto): Promise<Tokens> {
    console.log(dto);
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await user.comparePassword(dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateResfreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async logout(userId: string) {
    await this.usersRepository.update(
      { id: userId, refreshTokenHash: Not(IsNull()) },
      { refreshTokenHash: null },
    );
  }
  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshTokenHash)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = user.compareRefreshTokenshash(refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateResfreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const [acessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get<string>('ACCESS_TOKENS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.config.get<string>('REFRESH_TOKENS_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      refresh_token: refreshToken,
      access_token: acessToken,
    };
  }

  async updateResfreshTokenHash(userId: string, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);

    await this.usersRepository.update(
      { id: userId },
      { refreshTokenHash: hash },
    );
    // await this.usersRepository.save();
  }
}
