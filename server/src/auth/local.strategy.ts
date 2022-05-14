import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { PrismaService } from 'src/shared/prisma/prisma.service';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
